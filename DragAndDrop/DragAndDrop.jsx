import React, { useState } from "react";
import classes from './DragAndDrop.module.css'



// События, происходящие с объектом перетаскивания:
// 1    // ondragstart (срабатывает в начале операции перетаскивания элемента).
// 1    // ondrag (срабатывает, когда элемент перетаскивается).
// 1    // ondragend (срабатывает, когда пользователь закончил перетаскивание элемента).
// События, происходящие с объектом на который перетаскивают:
// 2   // ondragenter (когда элемент будет перенесен на заданную зону (цель для переноса)).
// 2   // ondragover (срабатывает, когда элемент перемещают над допустимой зоной для переноса).
// 2   // ondragleave (срабатывает, когда элемент выходит из допустимой зоны для переноса).
// 2   // ondrop (срабатывает после того, как перетаскиваемый элемент опустился на объект перетаскивания).
// Источник: https://wm-school.ru

function DragAndDrop({ children, ...props }) {
    const [oldStyles, setOldStyles] = useState(null);

    function onDradStartHandler(event) {
        event.preventDefault()
        if (props?.dragZoneRef?.current) {
            setOldStyles(old => ({ dragZone: props.dragZoneRef.current.style, ...old }))
            props.dragZoneRef.current.addEventListener('drop', e => onDropHandelr(e))
            props.dragZoneRef.current.style.borderStyle = props?.borderStyle ? props?.borderStyle : "dashed"
            props.dragZoneRef.current.style.borderWidth = props?.borderWidth ? props?.borderWidth : "2px"
            props.dragZoneRef.current.style.borderColor = props?.borderColor ? props?.borderColor : "gray"
        }
        if (props?.mainContainerRef?.current) {
            setOldStyles(old => ({ mainContainer: props.mainContainerRef.current.style, ...old }))
            props.mainContainerRef.current.style.filter = `blur(${props?.blur ? props?.blur : 4}px)`
        }
    }

    function restoringStyles() {
        props.dragZoneRef.current.style = oldStyles?.dragZone
        props.mainContainerRef.current.style = oldStyles?.mainContainer
    }

    function onDragLeaveHandler(event) {
        event.preventDefault()
        restoringStyles()
    }

    function onDropHandelr(event) {
        event.preventDefault()
        const file = [...event.dataTransfer.files][0]
        const formData = new FormData()
        formData.append("file", file)
        props.callback(formData)
        restoringStyles()
        return formData
    }



    return (
        <form>
            <div className={classes.wrapper}
                onDragOver={e => onDradStartHandler(e)}
                onDragStart={e => onDradStartHandler(e)}
                onDragLeave={e => onDragLeaveHandler(e)}
                onDrop={e => onDragLeaveHandler(e)}>
                {children}
            </div>
        </form>
    );
}

export default DragAndDrop; 