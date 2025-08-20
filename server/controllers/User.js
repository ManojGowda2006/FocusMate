const User = require("../models/User");

const sendUser = async(req, res) => {
    try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        name: user.name,
        email: user.email,
        image: user.image,
    });
 
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", err:error.message });
    }

}


const updateUser = async (req, res) => {
    try {
        const id = req.user.id;
        const { name, email, image } = req.body;

        const user = await User.findByIdAndUpdate(
            id,     
            { name, email, image },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully"       
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
}

module.exports = {
    sendUser,   
    updateUser
};