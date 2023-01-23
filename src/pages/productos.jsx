import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../firebase/api";
import { useRouter } from "next/router";
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { deleteFile, getUrl } from "@/firebase/config";
import Link from "next/link";

const productos = () => {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [term, setTerm] = useState("");

  const getProduc = async () => {
    const querySnapshot = await getProducts();
    const docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    setProducts(docs);
  };

  function searchingTerm(term) {
    return function (x) {
      return (
        x.name.toLowerCase().includes(term) ||
        x.code.toLowerCase().includes(term) ||
        !term
      );
    };
  }

  useEffect(() => {
    getProduc();
  }, [products]);

  const onDeleteProduct = async (id, image) => {
    if (window.confirm("Desea Eliminar este Producto")) {
      await deleteProduct(id);
      await deleteFile(image);
    }
  };

  return (
    <div className="h-screen pt-[3%] pl-[22%] bg-white">
      <div className="flex mb-10">
        <p className="mr-2">Tablero de productos</p>
        <p> / </p>
        <p className="ml-2">Lista de productos</p>
      </div>

      <div className="border-b border-gray-300">
        <h1 className="font-bold mb-10 text-2xl">Lista de productos</h1>
      </div>

      <div className="bg-gray-200 rounded-md">
        <div>
          <h2 className="pl-4 ml-7 font-semibold">
            Buscar por Nombre o código del Producto
          </h2>
        </div>

        <div className="pl-4 pt-4 flex justify-around">
          <div>
            <input
              className="border-2 w-300 rounded-sm border-gray-300"
              name="term"
              onChange={(e) => setTerm(e.target.value)}
              type="text"
            />
          </div>
          <div>
            <button className="border-2 p-2 bg-white rounded-sm border-gray-300">
              <AiOutlineFilter />
            </button>
          </div>
          <div>
            <button
              className="bg-green-500 rounded-full py-1 px-10 text-white font-semibold hover:bg-green-800"
              onClick={() => router.push("/registro")}
            >
              + Agregar Producto
            </button>
          </div>
        </div>

        <table className="w-full bg-white shadow mt-5 table-auto overflow-y-scroll">
          <thead className="dark:bg-cyan-900 text-white">
            <tr>
              <th className="p-2">Imagen</th>
              <th className="p-2">Nombre del Producto</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Código del Sistema</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.filter(searchingTerm(term)).map((product) => (
              <tr className="border-b" key={product.id}>
                <td className="p-2 justify-center items-center">
                  <Link href={product.url} target="_blank">
                    <img src={product.url} className="w-24 h-24" />
                  </Link>
                </td>

                <td className="p-2 justify-center items-center">
                  <p className="text-gray-800">{product.name}</p>
                </td>

                <td className="p-2 justify-center items-center">
                  <p className="text-gray-600"> {product.description} </p>
                </td>

                <td className="p-2 flex justify-center items-center">
                  <p className="text-gray-600"> {product.code} </p>
                </td>
                <td className="p-2 justify-center items-center">
                  <button
                    className="border-2 p-2 hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProduct(product.id, product.image);
                    }}
                  >
                    <AiOutlineDelete />
                  </button>
                  <button
                    className="border-2 p-2 hover:bg-green-600"
                    onClick={() => router.push(`/formulario/${product.id}`)}
                  >
                    <AiOutlineEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!products.length && (
          <p className="text-center mt-10">No Hay Productos aún</p>
        )}
      </div>
    </div>
  );
};

export default productos;
