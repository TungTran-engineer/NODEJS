import User from "../models/user.js";

class UserController {
    static async index(req, res) {
        let q = req.query.q;
        const re = new RegExp(q, 'i');
        let users;
        if (q) {
            users = await User.find({ $or: [{ name: re }, { email: re }] });
        } else {
            users = await User.find();
        }
        res.render("user", { title: "user page", users, q });
    }

    static async new(req, res) {
        res.render("formnew", { title: "User management" });
    }

    static async create(req, res) {
        const { name, email, age } = req.body;
        try {
            const user = new User({ name, email, age });
            await user.save();
            res.redirect("/users");  
        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).send("An error occurred while saving the user.");
        }
    }
    static async delete(req, res) {
      // console.log(req.params.id);
      let id = req.params.id;
      let { deletedCount } = await User.deleteOne({ _id: id });
      if (deletedCount == 0) {
        console.log("Khong xoa duoc !!");
      } else {
        console.log("Da xoa duoc !!");
      }
      res.redirect("/users");
    }
    static async edit(req, res) {
      try {
        const user = await User.findById(req.params.id);
        res.render("formedit", { title: "Edit User", user });
      } catch (err) {
        console.error(err);
        res.status(500).send("Error loading user data.");
      }
    }
  
    // Update the user in the database
    static async update(req, res) {
      try {
        const { email, name, age } = req.body;
        await User.findByIdAndUpdate(req.params.id, { email, name, age });
        res.redirect("/users");  // Redirect to the user list after update
      } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user.");
      }
    }

  }

export default UserController;
