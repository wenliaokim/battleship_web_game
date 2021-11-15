export const changeShowRule = () => {
    return {
        type: 'changeShowRule'
    }
}

export const startDrag = (clickXY, topXY, direction, length, id) => {
    return {
        type: "startDrag",
        clickXY: clickXY,
        topXY: topXY,
        direction: direction,
        length: length,
        id: id,
    }
}

export const dropShip = (id, i, j) => {
    return {
        type: "dropBattleship",
        id: id,
        i: i,
        j: j,
    }
}

export const clickBattleship = (id) => {
    return {
        type: "clickBattleship",
        id: id,
    }
}

export const ChangeDir = (id) => {
    return {
        type: "changeDirection",
        id: id,
    }
}

export const randomlyPut = () => {
    return {
        type: "randomlyPutShips",
    }
}

export const finishDrag = () => {
    return {
        type: "finishDrag",
    }
}

export const doneAllDragging = () => {
    return {
        type: "dragDone",
    }
}

export const dropFails = (id) => {
    return {
        type: "dropFails",
        id: id
    }
}

export const boardClick = (i, j) => {
    return {
        type: "boardClick",
        x: i,
        y: j
    }
}

export const playerBoardUpdate = () => {
    return  {
        type: "playerBoardUpdate",
    }
}
