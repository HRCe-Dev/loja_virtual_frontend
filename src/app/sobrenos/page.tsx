"use client";
import Image from "next/image";


export default function Sobrenos() {
    return (
        <div className="w-full">
     
            <div className="flex">
                <Image
                    src="img/banner2.jpeg"
                    alt="Banner 2"
                    width={600}
                    height={300}
                    className="w-full h-auto object-cover mb-10"
                />
            </div>

          
            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-8 w-full px-4 mb-10">
                <div className="w-full sm:w-1/5">
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={600}
                        height={300}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="w-full sm:w-1/3">
                    <p className="text-lg sm:text-2xl font-bold text-[#265674]">
                        Somos apaixonados por tecnologia e acreditamos que cada cliente merece mais do que apenas um bom produto: merece uma experiência. Esta página conta um pouco da nossa jornada.
                    </p>
                </div>
            </div>

            
            <div className="flex justify-center py-4">
                <p className="text-3xl font-extrabold text-[#265674]">A História da Marca</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-8 w-full px-4 mb-10">
                <div className="w-full sm:w-1/3 text-left">
                    <p className="text-xl sm:text-2xl font-bold text-[#265674] pb-4">Tudo começou com um sonho em comum</p>
                    <p className="text-sm text-left">
                        A HRCe nasceu da visão e do espírito empreendedor de quatro irmãos unidos por um objetivo em comum – criar soluções inovadoras para impulsionar empresas – transformar a sua experiência e paixão num projeto sólido e ambicioso.
                    </p>
                </div>

                <div className="w-full sm:w-1/4">
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

           
            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-10 w-full px-4">
                <div className="w-full sm:w-1/4">
                    <Image
                        src="img/logo3.jpeg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="w-full sm:w-1/3 text-left">
                    <p className="text-xl sm:text-2xl font-bold text-[#265674] pb-4">Mais do que uma empresa: uma família com propósito</p>
                    <p className="text-sm text-left">
                        Desde o primeiro dia, a nossa força vem da nossa equipa. Valorizamos o talento, a dedicação e o compromisso. Juntos, enfrentamos desafios, crescemos com os nossos clientes e mantemos a essência familiar e colaborativa que nos diferencia.
                    </p>
                </div>
            </div>

           
            <div className="flex flex-col items-center justify-center text-center w-full py-10">
                <div className="w-full sm:w-1/3">
                    <p className="text-2xl sm:text-3xl font-bold text-[#265674]">O que fazemos com excelência</p>
                </div>

                <div className="w-full">
                    <Image
                        src="img/banner4.png"
                        alt="Banner"
                        width={500}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

     
            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-8 w-full pb-20 px-4">
                <div className="w-full sm:w-1/3 text-left">
                    <p className="text-xl sm:text-2xl font-bold text-[#265674] pb-4">Crescimento com confiança</p>
                    <p className="text-sm text-left">
                        A nossa jornada é feita de conquistas, parcerias duradouras e crescimento sustentado. Evoluímos sem nunca esquecer os princípios que nos trouxeram até aqui. Cada cliente é parte dessa história. Cada projeto é um novo passo em frente.
                    </p>
                </div>

                <div className="w-full sm:w-1/4">
                    <Image
                        src="img/logo3.jpeg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-8 w-full pb-20 px-4">
                <div className="w-full sm:w-1/4">
                    <Image
                        src="img/logo3.jpeg"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="w-full sm:w-1/3 text-left">
                    <p className="text-xl sm:text-2xl font-bold text-[#265674] pb-4">O nosso futuro começa agora</p>
                    <p className="text-sm text-left">
                        O caminho continua e a nossa missão é clara: ser um parceiro estratégico para negócios que querem crescer com confiança e inovação. Estamos prontos para construir os próximos capítulos com quem acredita no valor da dedicação.
                    </p>
                </div>
            </div>

        
            <div className="flex flex-col items-center justify-center text-center w-full py-10">
                <div className="w-full sm:w-1/3">
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#265674] pb-4">Nosso time</p>
                </div>

                <div className="w-full px-10 flex  justify-center flex-wrap">
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="w-1/2 sm:w-1/4"
                    />
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="w-1/2 sm:w-1/4"
                    />
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="w-1/2 sm:w-1/4"
                    />
                    <Image
                        src="img/logo.png"
                        alt="Logo"
                        width={200}
                        height={100}
                        className="w-1/2 sm:w-1/4"
                    />
                </div>
            </div>
        </div>
    );
}
