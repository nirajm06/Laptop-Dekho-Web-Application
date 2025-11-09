import { useState } from "react";
import ProfileSidebar from "../../components/Profile/ProfileSidebar.jsx";
import ProfileInfo from "../../components/Profile/ProfileInfo.jsx";
import AddressManager from "../../components/Profile/AddressManager.jsx";
import OrderHistory from "../../components/Profile/OrderHistory.jsx";
import Settings from "../../components/Profile/Settings.jsx";
import HelpSupport from "../../components/Profile/HelpSupport.jsx";
import Wishlist from "../../pages/cartpages/Wishlist.jsx";
import Dashboard from "../../components/Profile/Dashboard.jsx";
import userData from "../../utils/UserInfo.js";
import AddProduct from "../../components/Profile/AddProduct.jsx";
import styles from "./Profile.module.css"; // Renamed from Pro to styles

function Profile({ wishlist, removeFromWishlist }) {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className={styles["profile-container"]}>
      <ProfileSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main className={styles["profile-main"]}>
        {activeSection === "profile" ? (
          <ProfileInfo />
        ) : activeSection === "addresses" ? (
          <AddressManager />
        ) : activeSection === "product" ? (
          <AddProduct />
        ) : activeSection === "orders" ? (
          <OrderHistory />
        ) : activeSection === "wishlist" ? (
          <Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
        ) : activeSection === "settings" ? (
          <Settings />
        ) : activeSection === "help" ? (
          <HelpSupport />
        ) : activeSection === "dashboard" ? (
          <Dashboard user={userData}/>
        ) : (
          <ProfileInfo />
        )}
      </main>
    </div>
  );
}

export default Profile;
