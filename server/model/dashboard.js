const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    bookings: {
      totalBookings: {
        type: Number,
      },
      upcomingBookings: {
        type: Number,
      },
      pendingPayments: {
        type: Number,
      },
      pendingBookingRequests: {
        type: Number,
      },
    },
    wallet: {
      walletBalance: {
        type: Number,
      },
    },
    ordercounts: [
      {
        oderyCountLabel: {
          type: String,
        },
        orderCount: {
          type: Number,
        },
        link: {
          type: String,
        },
      },
    ],
    profiles: [
      {
        profileId: {
          type: Number,
        },
        profileType: {
          type: String,
        },
        profileName: {
          type: String,
        },
        completionPercentage: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Dashboard", dataSchema);
