Release note:
Bình thường nếu không thay đổi gì phía native thì không cần đẩy bản mới lên store mà chỉ cần release bằng Codepush.

Các bước release bằng codepush:
- Login vào web appcenter https://appcenter.ms/
- Cài đặt appcenter:
```shell
npm install -g appcenter-cli
```
- Login vào command appcenter:
```shell
appcenter login
```
- Release 2 bản iOS và Android:
```shell
appcenter codepush release-react -a tienngay/TienNgay.vn.Investor-iOS -d Production
```
```shell
appcenter codepush release-react -a tienngay/TienNgay.vn.Investor-Android -d Production
```

=======
Change key for specific environment
# app center: 

Android
┌────────────┬───────────────────────────────────────┐
│ Name       │ Key                                   │
├────────────┼───────────────────────────────────────┤
│ Production │ │
├────────────┼───────────────────────────────────────┤
│ Staging    │  │
└────────────┴───────────────────────────────────────┘

iOS
┌────────────┬───────────────────────────────────────┐
│ Name       │ Key                                   │
├────────────┼───────────────────────────────────────┤
│ Staging    │  │
├────────────┼───────────────────────────────────────┤
│ Production │  │
└────────────┴───────────────────────────────────────┘

# bugsnag
key: aedcu2cb6b0f00f100a45fc1efd934053
