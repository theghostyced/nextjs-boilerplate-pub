interface IProps {
    customClass?: string;
}

export const ArrowRight = ({ customClass }: IProps) => (
    <svg className={customClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="arrow-right-icon">Arrow icon pointing right</title>
        <path d="M16.7999 12L11.9999 16.8M16.7999 12L11.9999 7.19999M16.7999 12L7.19993 12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export const ArrowLeft = ({ customClass }: IProps) => (
    <svg className={customClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <title id="arrow-left-icon">Arrow icon pointing left</title>
        <path d="M7.19995 12L12 7.2M7.19995 12L12 16.8M7.19995 12H16.8" stroke="currentColor" strokeWidth="1.5" />
    </svg >
);

export const ChevronDown = ({ customClass }: IProps) => (
    <svg className={customClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <title id="arrow-down-icon">Arrow pointing down</title>
        <path d="M7.19995 9.6L12 14.4L16.8 9.6" stroke="currentColor" strokeWidth="1.5" />
    </svg >
);

export const Play = ({ customClass }: IProps) => (
    <svg className={customClass} width="49" height="63" viewBox="0 0 49 63" fill="transparent" xmlns="http://www.w3.org/2000/svg">
        <title id="arrow-play">Play icon</title>
        <path d="M1.75 3.47543L46.188 31.5L1.75 59.5246L1.75 3.47543Z" stroke="currentColor" strokeWidth="3" />
    </svg>
);

export const Minus = ({customClass}: IProps) => (
    <svg className={customClass} width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <title id="minus-icon">Minus icon</title>
        <path d="M7.19995 12H16.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg >
);

export const Plus = ({ customClass }: IProps) => (
    <svg className={customClass} width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" xmlns = "http://www.w3.org/2000/svg" >
        <title id="plus-icon">Plus icon</title>
        <path d="M7.2 12h9.6M12 7.2v9.6" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg >
);

export const Close = ({ customClass }: IProps) => (
    <svg className={customClass} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="close-icon">Close icon</title>
        <path d="m8.4 8.4 7.2 7.2m0-7.2-7.2 7.2" stroke="currentColor" strokeLinecap="square" strokeWidth="1.5" />
    </svg>
);

export const Check = ({ customClass }: IProps) => (
    <svg className={customClass} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="check-icon">Check icon</title>
        <path d="M13.333 19.4872L17.5435 23.3333L26.6663 15" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const Uncheck = ({ customClass }: IProps) => (
    <svg className={customClass} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="uncheck-icon">Uncheck icon</title>
        <path d="M26.4822 15.286L24.7144 13.5182L20.0005 18.2321L15.2865 13.5182L13.5187 15.286L18.2327 19.9999L13.5186 24.714L15.2863 26.4818L20.0005 21.7677L24.7146 26.4818L26.4824 24.714L21.7682 19.9999L26.4822 15.286Z" fill="currentColor"/>
    </svg>
);

export const FacebookIcon = ({customClass}: IProps) => (
    <svg className={customClass} viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="facebook-icon">Facebook</title>
        <path d="M6.99984 2H4.99984C4.63164 2 4.33317 2.29848 4.33317 2.66667V4.66667H6.99984C7.07564 4.66499 7.14757 4.70027 7.19264 4.76127C7.2377 4.82227 7.25037 4.90133 7.2265 4.97333L6.73317 6.44C6.6877 6.5746 6.5619 6.6656 6.41984 6.66667H4.33317V11.6667C4.33317 11.8507 4.1839 12 3.99984 12H2.33317C2.14908 12 1.99984 11.8507 1.99984 11.6667V6.66667H0.999837C0.815744 6.66667 0.666504 6.5174 0.666504 6.33333V5C0.666504 4.81593 0.815744 4.66667 0.999837 4.66667H1.99984V2.66667C1.99984 1.19391 3.19377 0 4.6665 0H6.99984C7.1839 0 7.33317 0.14924 7.33317 0.333333V1.66667C7.33317 1.85076 7.1839 2 6.99984 2Z" fill="currentColor"/>
    </svg>
)

export const InstagramIcon = ({customClass}: IProps) => (
    <svg className={customClass} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="instagram-icon">Instagram</title>
        <path fillRule="evenodd" clipRule="evenodd" d="M8.66667 0H3.33333C1.49239 0 0 1.49239 0 3.33333V8.66667C0 10.5076 1.49239 12 3.33333 12H8.66667C10.5076 12 12 10.5076 12 8.66667V3.33333C12 1.49239 10.5076 0 8.66667 0ZM10.8333 8.66667C10.8297 9.86173 9.86173 10.8297 8.66667 10.8333H3.33333C2.13823 10.8297 1.17033 9.86173 1.16667 8.66667V3.33333C1.17033 2.13823 2.13823 1.17033 3.33333 1.16667H8.66667C9.86173 1.17033 10.8297 2.13823 10.8333 3.33333V8.66667ZM9.16667 3.5C9.53487 3.5 9.83333 3.20152 9.83333 2.83333C9.83333 2.46515 9.53487 2.16667 9.16667 2.16667C8.79847 2.16667 8.5 2.46515 8.5 2.83333C8.5 3.20152 8.79847 3.5 9.16667 3.5ZM6 3C4.34315 3 3 4.34315 3 6C3 7.65687 4.34315 9 6 9C7.65687 9 9 7.65687 9 6C9.0018 5.2038 8.68627 4.43971 8.12327 3.87672C7.56027 3.31373 6.7962 2.99823 6 3ZM4.16667 6C4.16667 7.01253 4.98747 7.83333 6 7.83333C7.01253 7.83333 7.83333 7.01253 7.83333 6C7.83333 4.98747 7.01253 4.16667 6 4.16667C4.98747 4.16667 4.16667 4.98747 4.16667 6Z" fill="currentColor"/>
    </svg>
)

export const LinkedInIcon = ({customClass}: IProps) => (
    <svg className={customClass} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="linkedin-icon">LinkedIn</title>
        <path fillRule="evenodd" clipRule="evenodd" d="M1.33333 0H10.6667C11.4031 0 12 0.596953 12 1.33333V10.6667C12 11.4031 11.4031 12 10.6667 12H1.33333C0.596953 12 0 11.4031 0 10.6667V1.33333C0 0.596953 0.596953 0 1.33333 0ZM3.33333 10C3.51743 10 3.66667 9.85073 3.66667 9.66667V5C3.66667 4.81593 3.51743 4.66667 3.33333 4.66667H2.33333C2.14924 4.66667 2 4.81593 2 5V9.66667C2 9.85073 2.14924 10 2.33333 10H3.33333ZM2.83333 4C2.28105 4 1.83333 3.55229 1.83333 3C1.83333 2.44771 2.28105 2 2.83333 2C3.38562 2 3.83333 2.44771 3.83333 3C3.83333 3.55229 3.38562 4 2.83333 4ZM9.66667 10C9.85073 10 10 9.85073 10 9.66667V6.6C10.0217 5.54053 9.2384 4.63635 8.18667 4.50667C7.45133 4.4395 6.73887 4.78293 6.33333 5.4V5C6.33333 4.81593 6.18407 4.66667 6 4.66667H5C4.81593 4.66667 4.66667 4.81593 4.66667 5V9.66667C4.66667 9.85073 4.81593 10 5 10H6C6.18407 10 6.33333 9.85073 6.33333 9.66667V7.16667C6.33333 6.6144 6.78107 6.16667 7.33333 6.16667C7.8856 6.16667 8.33333 6.6144 8.33333 7.16667V9.66667C8.33333 9.85073 8.4826 10 8.66667 10H9.66667Z" fill="currentColor"/>
    </svg>
)

export const TwitterIcon = ({customClass}: IProps) => (
    <svg className={customClass} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <title id="twitter-icon">Twitter</title>
        <path d="M11.9819 1.47827C11.6723 1.89128 11.2981 2.25155 10.8736 2.54517C10.8736 2.65306 10.8736 2.76095 10.8736 2.87483C10.877 4.83407 10.0944 6.71273 8.70128 8.08967C7.30808 9.4666 5.42088 10.2266 3.46278 10.1993C2.33074 10.2031 1.2132 9.9446 0.197696 9.44407C0.142936 9.42013 0.107623 9.366 0.107829 9.3062V9.24027C0.107829 9.1542 0.177569 9.08447 0.263596 9.08447C1.37636 9.04773 2.44943 8.66193 3.33098 7.9816C2.32377 7.96127 1.41754 7.3646 1.00048 6.44713C0.979423 6.39707 0.985976 6.33953 1.0178 6.29547C1.04961 6.2514 1.10208 6.22713 1.15625 6.2314C1.46236 6.26213 1.77154 6.23367 2.06688 6.14747C0.955009 5.91667 0.119556 4.9936 -1.0575e-05 3.8638C-0.00425724 3.8096 0.0200294 3.75713 0.0640827 3.72527C0.108129 3.69347 0.165576 3.68687 0.215669 3.708C0.514043 3.83967 0.836143 3.909 1.16224 3.91173C0.187976 3.27231 -0.232844 2.05603 0.137783 0.950815C0.176043 0.843421 0.267956 0.764081 0.379749 0.741961C0.491536 0.719835 0.606723 0.758188 0.682963 0.842928C1.99768 2.24217 3.80411 3.07597 5.72135 3.16853C5.67228 2.97257 5.64815 2.77117 5.64948 2.56915C5.66742 1.50981 6.32288 0.566141 7.30902 0.179915C8.29508 -0.206305 9.41668 0.0413548 10.1487 0.806961C10.6477 0.711901 11.1301 0.544301 11.5806 0.309475C11.6136 0.288875 11.6554 0.288875 11.6884 0.309475C11.709 0.342488 11.709 0.384348 11.6884 0.417361C11.4702 0.917015 11.1016 1.33608 10.634 1.61613C11.0435 1.56864 11.4457 1.47205 11.8322 1.32843C11.8647 1.30628 11.9075 1.30628 11.94 1.32843C11.9673 1.34089 11.9877 1.36474 11.9957 1.39361C12.0038 1.42249 11.9987 1.45345 11.9819 1.47827Z" fill="currentColor"/>
    </svg>
)
