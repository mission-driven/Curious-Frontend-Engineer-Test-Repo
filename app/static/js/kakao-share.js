function shareMessage(
    title,
    description,
    linkUrl,
    buttonUrl,
    imageUrl,
    buttonTitle='',
    serverCallbackArgs
) {
    buttonTitle = buttonTitle || title;

    if (!Kakao.isInitialized()) {
        Kakao.init("hello-developers!"); // 사용하려는 앱의 JavaScript 키 입력
    }
    Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
            title: title,
            description: description,
            imageUrl: imageUrl,

            link: {
                // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                mobileWebUrl: linkUrl,
                webUrl: linkUrl,
            },
        },
        buttons: [
            {
                title: buttonTitle,
                link: {
                    mobileWebUrl: buttonUrl,
                    webUrl: buttonUrl,
                },
            },
        ],
        serverCallbackArgs: serverCallbackArgs,
    });
}
