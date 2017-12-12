---
layout: android
title: GetCountryCode
permalink: /android/get-country-code-amit-lib/
---

{: .info .note}
**GetCountryCode**<br>An open source library developed for getting the country code of users android mobile.

[See on GitHub](https://github.com/amit-upadhyay-IT/GetCountryCode)

### Change dependencies library
- countrycode.
- countrycodesadapter

#### Dependencies library usage

##### Step 1
###### Gradle

```groovy
dependencies {
    compile 'com.minimumstack.amit_upadhyay_it.datastructure:countrycode:0.0.0'
    compile 'com.minimumstack.amit_upadhyay_it.adapter:countrycodesadapter:0.0.0'
}
```
##### Step 2 --Class

```groovy
new CountryCodesAdapter()
new CountryCodesWithDropDowmAdapter();
setAdapter(new CountryCodesAdapter());
setAdapter(new CountryCodesWithDropDowmAdapter());
```
##### Step 2 --extends Class
```groovy
public class YourCountryCodesAdapter extends AbstractCountryCodesAdapter{
     public YourCountryCodesAdapter() {
        super();
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
       ....balabala
    }
}
```
<br>
#  [Example Pic](https://i.stack.imgur.com/zu3w7.png?raw=true)

![](https://i.stack.imgur.com/zu3w7.png?raw=true)

Use
compile `'com.googlecode.libphonenumber:libphonenumber:8.0.1'`
depencency.

This makes task easy and provide accurate result because its by google `https://github.com/googlei18n/libphonenumber`


