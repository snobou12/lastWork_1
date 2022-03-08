import ReactTooltip from "react-tooltip"

const CustomTooltip = (props) => {
  return <ReactTooltip clickable={true} multiline={true} backgroundColor="#0D5190" effect="solid" {...props}>{props.children}</ReactTooltip>
}

export default CustomTooltip;