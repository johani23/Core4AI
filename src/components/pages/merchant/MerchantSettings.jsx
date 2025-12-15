// ============================================================================
// 💚 Core4.AI – MerchantSettings.jsx (Step 14 — Store Profile + Preferences)
// ============================================================================
// - Store basic info
// - Logo upload
// - Contact details
// - Notification preferences
// - Saves to LocalStorage (MVP Ready)
// ============================================================================

import React, { useState, useEffect } from "react";
import BackToMerchant from "@/components/common/BackToMerchant";
import { motion } from "framer-motion";

export default function MerchantSettings() {
  const [settings, setSettings] = useState({
    storeName: "",
    storeType: "",
    logo: null,
    email: "",
    phone: "",
    website: "",
    notifications: {
      priceAlerts: true,
      demandAlerts: true,
      competitorAlerts: true,
      influencerAlerts: true,
    },
  });

  // Load from storage
  useEffect(() => {
    const saved = localStorage.getItem("core4ai_merchant_settings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const saveSettings = () => {
    localStorage.setItem("core4ai_merchant_settings", JSON.stringify(settings));
    alert("✔ تم حفظ الإعدادات بنجاح");
  };

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings({ ...settings, logo: file.name });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 page-wrapper" dir="rtl">
      <BackToMerchant />

      <h1 className="text-3xl font-extrabold text-purple-400 mb-8 text-right">
        إعدادات التاجر — Core4.AI
      </h1>

      {/* ======================== Store Info ============================== */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-title">🛍 معلومات المتجر</h2>

        <input
          className="input mb-4"
          placeholder="اسم المتجر"
          value={settings.storeName}
          onChange={(e) =>
            setSettings({ ...settings, storeName: e.target.value })
          }
        />

        <select
          className="input mb-4"
          value={settings.storeType}
          onChange={(e) =>
            setSettings({ ...settings, storeType: e.target.value })
          }
        >
          <option value="">اختر نوع المتجر</option>
          <option value="brand">علامة تجارية</option>
          <option value="reseller">تاجر جملة / موزع</option>
          <option value="small">متجر صغير</option>
        </select>

        <input
          type="file"
          className="input mb-4"
          onChange={handleLogo}
        />
        {settings.logo && (
          <p className="text-gray-400 text-sm">الشعار المختار: {settings.logo}</p>
        )}
      </motion.div>

      {/* ======================== Contact Info ============================== */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-title">📞 بيانات التواصل</h2>

        <input
          className="input mb-4"
          placeholder="البريد الإلكتروني"
          value={settings.email}
          onChange={(e) =>
            setSettings({ ...settings, email: e.target.value })
          }
        />

        <input
          className="input mb-4"
          placeholder="رقم الجوال"
          value={settings.phone}
          onChange={(e) =>
            setSettings({ ...settings, phone: e.target.value })
          }
        />

        <input
          className="input mb-4"
          placeholder="موقع إلكتروني / حساب إنستغرام"
          value={settings.website}
          onChange={(e) =>
            setSettings({ ...settings, website: e.target.value })
          }
        />
      </motion.div>

      {/* ======================== Notification Preferences ============================== */}
      <motion.div
        className="core-card mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="section-title">🔔 تفضيلات التنبيه</h2>

        <div className="space-y-3 text-gray-200">

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.priceAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    priceAlerts: e.target.checked,
                  },
                })
              }
            />
            تنبيهات الأسعار
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.demandAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    demandAlerts: e.target.checked,
                  },
                })
              }
            />
            تنبيهات الطلب
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.competitorAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    competitorAlerts: e.target.checked,
                  },
                })
              }
            />
            تنبيهات المنافسين
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={settings.notifications.influencerAlerts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    influencerAlerts: e.target.checked,
                  },
                })
              }
            />
            تنبيهات المؤثرين
          </label>
        </div>
      </motion.div>

      {/* ======================== Save Button ============================== */}
      <button className="btn-green w-full mt-6" onClick={saveSettings}>
        💾 حفظ الإعدادات
      </button>
    </div>
  );
}
