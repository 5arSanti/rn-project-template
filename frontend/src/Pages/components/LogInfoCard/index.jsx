import { FadeWrapper } from "../FadeWrapper";
import { SpanCard, TextCard } from "../TextComponents";
import { WrapperContainer3 } from "../WrapperContainers";

import "./styles.css";

const LogInfoCard = ({icon, title, text, fontSize=24, width="100%", padding=40, gap=20}) => {
    return(
        <FadeWrapper width={width}>
            <WrapperContainer3 width={width} height="100%" flexDirection="column" gap={gap} justifyContent="center" padding={padding} className="log-info-card">
                {icon || ""}

                <TextCard fontSize={fontSize} className="bold" textAlign="center">
                    {text}
                </TextCard>

                <TextCard textAlign="center">
                    <SpanCard className={"italic"} fontSize={14}>
                        {title}
                    </SpanCard>
                </TextCard>

            </WrapperContainer3>
        </FadeWrapper>
    );
}

export { LogInfoCard };