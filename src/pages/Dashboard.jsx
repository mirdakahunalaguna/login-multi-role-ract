import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  // Mendapatkan instance dispatch dari Redux
  const dispatch = useDispatch();
  // Mendapatkan fungsi navigasi dari React Router
  const navigate = useNavigate();
  // Mengambil nilai isError dari state Redux menggunakan useSelector
  const { isError } = useSelector((state) => state.auth);

  // Efek samping untuk memanggil aksi getMe setelah komponen dimuat
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Efek samping untuk menangani error dan navigasi
  useEffect(() => {
    // Jika terjadi error, navigasikan pengguna kembali ke halaman utama
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  // Return komponen Layout yang berisi Welcome
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

// Mendeklarasikan bahwa komponen Dashboard dapat diekspor
export default Dashboard;
