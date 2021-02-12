export function getUrgency(urgency) {      
    switch(urgency) {
        case 'info':
            return 'Infomational';
        case 'alert':
            return 'Alert';
        default:
            return 'N/A';
    }

}