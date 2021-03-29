const modal_styles = {
position:'fixed',
left:'50%',
right:'50%',
transform:'translate(-50%, -50%)',
backgroundcolor:'black',
padding:"50px",
zIndex:1
}
const overlay_style = {
    position:'fixed',
    top:'50%',
    left:0,
    right:0,
    bottom:0,
    backgroundcolor:'black',
    zIndex:2
    }
function Modal({open,children, onclose})
{
    if(!open) return null
    return (
        <div style={overlay_style}>
        <div style={modal_styles}>
            {children}
            <button onClick={onclose}>Close</button>
        </div>
        </div>
    );
};
export default Modal;