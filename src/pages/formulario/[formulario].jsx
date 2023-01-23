import { useEffect, useState } from "react";
import { saveProduct, getProduct, updateProduct } from "../../firebase/api";
import { useRouter } from "next/router";
import { uploadFile, getUrl } from "@/firebase/config";

const initialState = {
  name: "",
  code: "",
  description: "",
  image: "",
};

const Formulario = (props) => {
  const router = useRouter();
  const id = router.query.formulario;

  const [file, setFile] = useState("");

  const [product, setProduct] = useState(initialState);

  const handleInputChange = ({ target: { name, value } }) =>
    setProduct({ ...product, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      product.image = await uploadFile(file);
      product.url = await getUrl(product.image);
      await saveProduct(product);
    } else {
      await updateProduct(id, product);
      router.push("/productos");
    }

    setProduct(initialState);
  };

  const getProductById = async (id) => {
    try {
      const doc = await getProduct(id);
      setProduct({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  return (
    <>
      <div className=" ml-[30%]">
        <div className="bg-gray-200 shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="nombre">
                Nombre:
              </label>
              <input
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Nombre del Producto"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-800" htmlFor="empresa">
                Código:
              </label>
              <input
                id="empresa"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50"
                placeholder="Código del Producto"
                name="code"
                value={product.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-800" htmlFor="notas">
                Descripción:
              </label>
              <textarea
                as="textarea"
                id="notas"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self"
                placeholder="Descripción del Producto"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-around items-center">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
              <button className="bg-cyan-900 text-white p-2 rounded-md justify-end">
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
