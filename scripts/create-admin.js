const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = "mongodb://localhost:27017/musa";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    type: { type: String, enum: ["individual", "shop", "admin"], default: "individual" },
    shopName: { type: String },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB ga ulanildi");

    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Mavjud adminni tekshirish
    const existingAdmin = await User.findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("✓ Admin allaqachon mavjud");
      console.log("  Username: admin");
      console.log("  Parol: admin1234");
      process.exit(0);
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash("admin1234", 10);

    // Admin yaratish
    const admin = await User.create({
      name: "Administrator",
      phone: "+998901234567",
      username: "admin",
      password: hashedPassword,
      type: "admin",
      isAdmin: true,
    });

    console.log("✓ Admin muvaffaqiyatli yaratildi!");
    console.log("  Username: admin");
    console.log("  Parol: admin1234");
    console.log("  ID:", admin._id);

    process.exit(0);
  } catch (error) {
    console.error("Xatolik:", error);
    process.exit(1);
  }
}

createAdmin();
