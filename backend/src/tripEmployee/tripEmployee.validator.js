class TripEmployeeValidator {

    static validate(data) {

    if (
        data.tripId === undefined ||
        data.tripId === null ||
        data.tripId === ""
    ) {
        throw new Error("Trip ID is required.");
    }

    if (
        !Number.isInteger(Number(data.tripId)) ||
        Number(data.tripId) < 1
    ) {
        throw new Error("Trip ID must be a valid positive integer.");
    }

    if (
        data.employeeId === undefined ||
        data.employeeId === null ||
        data.employeeId === ""
    ) {
        throw new Error("Employee ID is required.");
    }

    if (
        !Number.isInteger(Number(data.employeeId)) ||
        Number(data.employeeId) < 1
    ) {
        throw new Error("Employee ID must be a valid positive integer.");
    }

    if (
        data.pickupOTP === undefined ||
        data.pickupOTP === null ||
        data.pickupOTP === ""
    ) {
        throw new Error("Pickup OTP is required.");
    }

    if (!/^\d{4}$/.test(String(data.pickupOTP))) {
        throw new Error("Pickup OTP must be exactly 4 digits.");
    }

    if (
        data.dropOTP === undefined ||
        data.dropOTP === null ||
        data.dropOTP === ""
    ) {
        throw new Error("Drop OTP is required.");
    }

    if (!/^\d{4}$/.test(String(data.dropOTP))) {
        throw new Error("Drop OTP must be exactly 4 digits.");
    }
}

}

module.exports = TripEmployeeValidator;