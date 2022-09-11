export const isDeviceMobile = () => {
    let width = 0;
    let deviceType = "";
    window.addEventListener('resize', () => { width = window.innerWidth });
    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
            navigator.userAgent
        )
    ) {
        deviceType = "Mobile";
    } else {
        deviceType = "Desktop";
    }
    return {
        mobile: (width <= 768) || deviceType === "Mobile",
        remove: window.removeEventListener('resize', () => { width = window.innerWidth })
    }
}



