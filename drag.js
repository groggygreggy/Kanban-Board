const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lanes");

draggables.forEach((task) => {
    task.addEventListener("dragstart", () => { /*event listener dragstart is made possible by the drag&drop api */
        task.classList.add("is-dragging");
    });
    task.addEventListener("dragend", () => {
        task.classList.remove("is-dragging");
    });
});

droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
        /*by default, the html won't want you to drag stuff over the swin lanes, prevents jancky, super sensitive drag and drops */
        e.preventDefault();
        
        const bottomTask = insertAboveTask(zone, e.clientY);
        const currentTask = document.querySelector(".is-dragging");

        /*if we don't have a bottom task, (remmeber that we are working on each of the zones rn) append on the zone of interst 
        the current task, else just shuffle it in ELSE if we did find a bottom task, insert the current task before bottom task*/
        if (!bottomTask) {
            zone.appendChild(currentTask);
        } else{
            zone.insertBefore(currentTask, bottomTask);
        }
    });
});

const insertAboveTask = (zone, mouseY) => {
    const els = zone.querySelectorAll(".task:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
        const {top} = task.getBoundingClientRect();
        /*gives the y position of the top of the task box */
        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset){
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask; /*return closesttask so that we can go back to the droppables */
};