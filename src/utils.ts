export function isDigit(value: string): boolean {
    let partn: RegExp = /^[0-9]*$/;

    if (partn.exec(value) === null || value === '') {
        return false;
    }

    return true;
}

export function isWhiteSpace(value: string): boolean {
    let partn: RegExp = /^(\r|\n|\s)*$/;

    if (partn.exec(value) === null || value === '') {
        return false;
    }

    return true;
}

export function isInt32(value: any): boolean {
    if (typeof value === 'number') {
        if (isNaN(value)) return false;
        else if (value < -2147483648 || value > 2147483647) return false;
        else return true;
    } else {
        return false;
    }
}

export function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
