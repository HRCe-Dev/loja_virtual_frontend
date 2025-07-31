"use client";
import Image from "next/image";
import React from "react";


export default function Contacto() {

    return (
        <div className="flex flex-col pb-10">
            <div className="w-2/5 font-medium flex flex-col justify-center items-start mx-20 my-16 gap-2 ">
                <p className="text-4xl font-bold ">Fala conosco</p>
                <p className="font-light">Precisas de ajuda, tens dúvidas ou queres pedir uma proposta?
                    Entra em contacto - respondemos rápido!</p>
            </div>

            <div className="w-full flex justify-end items-end">
                <Image
                    src="img/mockup1.png"
                    alt="Logo"
                    width={600}
                    height={300}
                    className="w-2/4 h-auto object-cover"
                />
            </div>

            <div className="w-2/5 font-medium flex flex-col justify-center items-start my-16 mx-20">
                <p className="text-3xl">Informações de Contacto</p>
                <div className="flex flex-col gap-4 mt-5">
                    <div className="flex gap-5">
                        <div className="w-5">
                            <Image
                                src="img/phone.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="w-full h-auto object-cover" />
                        </div>
                        <a href="" className="text-blue-900">(+238) 3478335</a> </div>

                    <div className="flex gap-5">
                        <div className="w-5">
                            <Image
                                src="img/whatsapp.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="w-full h-auto object-cover" />
                        </div>
                        <a href="" className="text-blue-900">(+238) 3478335</a> </div>

                    <div className="flex gap-5">
                        <div className="w-5">
                            <Image
                                src="img/gmail.png"
                                alt="Logo"
                                width={100}
                                height={100}
                                className="w-full h-auto object-cover" />
                        </div>

                        <a href="" className="text-blue-900">geral@hrcelda.com</a> </div>
                </div>

            </div>


            <div className="w-2/5 font-medium flex flex-col justify-center items-start my-16 mx-20">
                <p className="text-3xl">Ou se preferir, entre em contacto conosco através de nossas redes:</p>

                <div className="flex gap-4 mt-5">

          
                    <div className="w-7">
                        <Image
                            src="img/facebook.png"
                            alt="Logo"
                            width={100}
                            height={100}
                            className="w-full h-auto object-cover" />
                    </div>

                    <div className="w-7">
                    <Image
                        src="img/instagram.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover" />
                </div>

                <div className="w-7">
                    <Image
                        src="img/linkedin.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover" />
                </div>
            </div>

                  </div>



                  <div className="px-16 ">
                    <Image
                        src="img/banner3.jpeg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover" />
                </div>
        </div>
    )
}