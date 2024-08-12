"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const longinAction = async (data) => {
  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${data.get("email")}:${data.get("password")}`),
      "Content-Type": "application/json",
    },
  });

  try {
    const responseData = await response.json();

    return {
      statusResponse: true,
      accessToken: responseData.access_token,
    };
  } catch (error) {
    return {
      statusResponse: false,
      accessToken: null,
    };
  }
};

export const deleteProduct = async (id, accessToken) => {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: accessToken,
    },
  });
  await response.json();

  revalidatePath("/products");
};

export const updateProduct = async (accessToken, data) => {
  const response = await fetch(
    `http://localhost:3000/products/${data.get("id")}`,
    {
      method: "POST",
      headers: {
        Authorization: accessToken,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        product: {
          id: data.get("id"),
          name: data.get("name"),
          description: data.get("description"),
          price: data.get("price"),
        },
      }),
    }
  );

  if (response.status === 401) {
    throw new Error("Debes iniciar sesión para crear un producto");
  }

  revalidatePath("/products");
  redirect("/products");
};

export const logout = () => {
  redirect("/login");
};

export const createProduct = async (accessToken, data) => {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      Authorization: accessToken,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      product: {
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
      },
    }),
  });

  if (response.status === 401) {
    throw new Error("Debes iniciar sesión para crear un producto");
  }

  revalidatePath("/products");
  redirect("/products");
};

export const getProduct = async (accessToken, id) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
      headers: {
        Authorization: accessToken,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
};
