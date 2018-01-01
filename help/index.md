---
layout: page
title: CRM project info
permalink: /edelweiss-crm-intern/
---


{: .info .note}
**Research part:**
My research was on integrating the `Redis` with `Lua script` for the optimization purpose. Much of my work was on `Node.js`, ORM like [`sequelizejs`](https://github.com/sequelize/sequelize), Lua script and Redis DB, but I was broadly interested in optimizing the algorithm which was working as a backbone in the CRM.

Below is the POC of my work there.

{: .info .note}
**The idea behind the optimized CRM:**

- To filter the meetings which are open and has meeting type email.
- Applying Client Security.
- Sort the Filtered data.
- Limit the "SortedFilteredSet".
- Get details from hashset.

{: .info .note}
**Proof of Concept:**

POC for filtering meeting on `MeetingStatus` and `MeetingType` and apply Client Security I need to maintain following 6 `sets/data` structure in Redis

Example:


    Set Name	                Set content (meetingId)
    meeting_type:email_ins_10	11, 12, 15, 16, 19, 20
    meeting_type:sms_ins_10 	11, 13, 15, 17, 19, 21
    meeting_status:open_ins_10	11, 13, 17, 19, 23
    meeting_status:close_ins_10	10, 12, 14, 16, 18, 20


    Set Name	        Set content (clientId)
    clients_for_user:1	7, 9, 11, 47
    clients_for_user:2	1, 2, 3, 8, 10, 11
    clients_for_user:3	4, 6, 8, 10, 12, 14, 16, 20, 24
    clients_for_user:4	3, 6, 9, 12, 15, 18, 21, 24



    HASHSET 	JSON string 	client id
    meeting:11	details here	2
    meeting:15	details here	7
    meeting:19	details here	8
    meeting:23	details here	12


**AIM 1.1**:

To filter the meetings which are open and has meeting type email :

**Example of clients sets:**

We fire following command

```
 "meeting_type:email" ∩ "meeting_status:open"
```

and 

We get set named as `FilteredSet` containing following `interactionId - {11, 19}`


**AIM 1.2:** Applying Client Security

For user:1

- Iterate through meeting `ids`  in `FilteredSet`
- Get client Id from `hash-set`.
- if `client Id` ∈ `clients_for_user:1`
   - Yes, Add it in the `array/set`


**AIM 1.3:** Sort the Filtered data

Sort the data obtained according to the users requirement. If required we will sort using external keys.

To sort meeting Ids according to meeting date, we make a sorted set.

Eg:


    meeting_date	element (meeting_id)	weight

                     meeting:1	    10062017

                     meeting:5	    12062017

                     meeting:6	    15062017
    
                     meeting:10	    16062017

                     meeting:12	    19062017
                
                
Now we perform :
```
"FilteredSet" ∩ "meeting_date"
```

Store the intersected set as `SortedFilteredSet`.



**AIM 1.4:** Limit the `SortedFilteredSet`.

Limit the data as per the parameters passed i.e. paging `OFFSET` and `display_count`.


**AIM 1.5:** Get details from hashset

Fetch the details from the HashSet using the meeting Ids.

{: .info .note}
**Script file, code for above POC(needed to run from redis server)**

Arguments to be passed :

- users_id
- Installation Id
- paging OFFSET and display_count
- meeting filtering parameters.

```lua
--[[
1) get user_id; (from keys[1])
2) get sort_by parameter as KEYS[2]
3) get start_limit and end_limit.
4) get meeting filtered set;
5) get client_for_user:x set;
6) iterate through meeting filtered set and get client id of that particular meeting from hashmap.
	6.1) check if that client id is member of set "client_for_user:x"
	6.2) store that meeting_id into a set, so that later we can perform sorting on that set.
7) sort the obtained filterd meeting set and apply limit over it.
8) fetch the details from the meeting:id from the hashmap.
	8.1) To fetch you can run a loop over available meeting ids and do 'hget key details'// key is the meeting_id
--]]

local user_id = KEYS[1] --  get user_id;

local sort_by = KEYS[2]
local start_limit = KEYS[3]
local end_limit = KEYS[4]

local meeting_filter_set = redis.call("sinterstore", "sampleset1"..user_id,  unpack(ARGV)) -- meeting filtered set.
local mfs = redis.call("sinter", unpack(ARGV)) -- meeting filtered set.

local clients_for_user_set_name = 'clients_for_user:'..user_id

local members_of_clients = redis.call("smembers", clients_for_user_set_name) -- client_for_user:x

-- iterating through meeting filtered set
for _,key in ipairs(mfs) do
	local obtained_client_ids = redis.call("HGET", 'meeting:'..key, "clientid")
	-- check if clientid obtained is contained in "members_of_clients"
	local val = redis.call("sismember", clients_for_user_set_name, obtained_client_ids)
	-- check if val is 0 or 1. If val == 1, store meeting:id into a set (or if val == 0, delete meetingid from the meeting_filtered_set)
	if val == 1 then
		redis.call("sadd", "sampleset2"..user_id, 'meeting:'..key)
	end
end

--[[local val2 = redis.call("sort", "sampleset1", "get", "meeting:*->clientid")--]]

-- get the members from set named "sampleset1"..user_id
local security_level_filter = redis.call("smembers", "sampleset2"..user_id)

-- use security_level_filter set name to sort according to whatever is passed as keys[2]
local sorted_content = redis.call("sort", "sampleset2"..user_id, "by", '*->'..sort_by, "limit" , start_limit, end_limit);

local allString = ""

-- fetch the details section from the hashmap of meeting:ids
for k, value in ipairs(sorted_content) do
	local details_str = redis.call("HGET", value, "details")
	allString = allString..', '..tostring(details_str)
end


return allString

--[[
Bugs:
1) 	new elements get appended with old elements in the sets created in memory, eg : sampleset1..user_id,
	sampleset2..user_id. this creates problem in getting the required meeting_ids after filtering.
--]]
```

Thank you 👏
