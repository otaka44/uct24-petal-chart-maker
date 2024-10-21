## 事前準備

### nvm install

リンク：[Node Version Manager](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

nvm install --lts

# node 最新バージョンをリストで表示 
nvm ls-remote --lts
# DL済みnodeバージョンを表示
nvm ls
```

```sh
DEBUG=myexpressapp:* npm start
```