---
title: 'Removing the last commit'
date: 2017-12-14 12:01:40 +0100
author: amit-upadhyay-it
categories: [github]
---

{: .info .note}
**Reverting back from a wrong commit**

Once you made a wrong commit to your project, generally you would wanna perform one among these two things:

- Revert the full commit

- Delete the last commit or last to last commit, ...


{: .note}
**Revert the full commit**

```sh
$ git revert 76eb9225c593b576d683b2453b05ad3b45c82ae
```
Where `76eb9225c593b576d683b2453b05ad3b45c82ae` is the commit_id.

{: .note}
**Delete the last commit**

Let's say we have a remote origin with branch master that currently points to commit `76eb9225c593b576d683b2453b05ad3b45c82ae`. We want to remove the top commit i.e. we want to force the master branch of the origin remote repository to the parent of `76eb9225c593b576d683b2453b05ad3b45c82ae`:

```sh
$ git push origin +76eb9225c593b576d683b2453b05ad3b45c82ae^:master
```

git interprets `x^` as the parent of `x` and `+` as a forced non-fastforward `push`.

Thank you 👏
