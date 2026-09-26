class TripEmployeeValidator {

    static validate(data) {

        if (!data.tripId) {
            throw new Error("Trip ID is required.");
        }

        if (!data.employeeId) {
            throw new Error("Employee ID is required.");
        }

        if (!data.pickupOTP) {
            throw new Error("Pickup OTP is required.");
        }

        if (!data.dropOTP) {
            throw new Error("Drop OTP is required.");
        }

    }

}

module.exports = TripEmployeeValidator;