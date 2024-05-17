import React, { useState, useEffect } from 'react';
import { Button } from '../components';
import { checkFormsForNonNullIds, checkStrengthForNonNullIds, checkPackagingForNonNullIds } from './StockAvalibility';

function Card({ salt_name, forms, salt_json, }) {

    const [formdata, setFormdata] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [selectedStrength, setSelectedStrength] = useState(null);
    const [selectedPackaging, setSelectedPackaging] = useState(null);

    const [showAllFormsButtons, setShowAllFormsButtons] = useState(false);
    const [showAllStrengthsButtons, setShowAllStrengthsButtons] = useState(false);
    const [showAllPackagingButtons, setShowAllPackagingButtons] = useState(false);

    const [filteredStrengths, setFilteredStrengths] = useState([]);
    const [filteredPackaging, setFilteredPackaging] = useState([]);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        const nonNullIds = checkFormsForNonNullIds(salt_json);
        const formData = forms.map((form, index) => ({
            Form: form.charAt(0) + form.slice(1), // Capitalize the first letter
            stock: nonNullIds[index]
        }));
        setFormdata(formData);
    }, [forms, salt_json]);

    useEffect(() => {
        if (formdata.length > 0) {
            setSelectedForm(formdata[0].Form);
        }
    }, [formdata]);

    useEffect(() => {
        if (selectedForm && salt_json[selectedForm]) {
            const strengths = Object.keys(salt_json[selectedForm]);
            const strengthData = salt_json[selectedForm]
            const StrengthnonNullIds = checkStrengthForNonNullIds(strengthData);
            const daa = strengths.map((str, index) => ({
                Strength: str.charAt(0) + str.slice(1),
                stock: StrengthnonNullIds[index]
            }));
            setFilteredStrengths(daa.map(daa => ({ name: daa.Strength, stock_available: daa.stock })));
            setSelectedStrength(strengths[0]);
        } else {
            setFilteredStrengths([]);
            setSelectedStrength(null);
        }
    }, [selectedForm, salt_json]);

    useEffect(() => {
        if (selectedForm && selectedStrength && salt_json[selectedForm] && salt_json[selectedForm][selectedStrength]) {
            const packagingOptions = Object.keys(salt_json[selectedForm][selectedStrength]);
            const packagingData = salt_json[selectedForm][selectedStrength];
            const packagingnonNullIds = checkPackagingForNonNullIds(packagingData);
            // console.log(packagingnonNullIds);
            const caa = packagingOptions.map((pack, index) => ({
                package: pack.charAt(0) + pack.slice(1),
                stock: packagingnonNullIds[index]
            }));
            console.log(caa);
            setFilteredPackaging(caa.map(caa => ({ name: caa.package, stock_available: caa.stock })));
            setSelectedPackaging(packagingOptions[0]);
        } else {
            setFilteredPackaging([]);
            setSelectedPackaging(null);
        }
    }, [selectedForm, selectedStrength, salt_json]);

    useEffect(() => {
        if (selectedForm && selectedStrength && selectedPackaging && salt_json[selectedForm] &&
            salt_json[selectedForm][selectedStrength] && salt_json[selectedForm][selectedStrength][selectedPackaging]) {
            const packagingData = salt_json[selectedForm][selectedStrength][selectedPackaging];
            const arrayFromObject = Object.entries(packagingData)
                .reduce((acc, [key, value]) => {
                    if (value !== null) {
                        acc.push({ value });
                    }
                    return acc;
                }, []).filter(obj => obj.value !== null && obj.value !== undefined);

            if (arrayFromObject.length === 0) {
                setPrice(false);
            } else {
                const sellingPrices = arrayFromObject.flatMap(item =>
                    Object.values(item.value).flatMap(obj => obj.selling_price)
                );
                const lowestPrice = Math.min(...sellingPrices);
                setPrice(lowestPrice);
            }
        }
    }, [selectedForm, selectedStrength, selectedPackaging, salt_json]);
    return (
        <div className='capitalize w-full min-h-[15rem] rounded-[1.2rem] p-4 flex justify-between items-center bg-gradient-to-r from-white via-slate-100 to-gray-200 shadow-[0_0_50px_0] shadow-stone-300'>
            <div className='bg-transparent w-[34%] min-h-[15rem] flex flex-col justify-between items-center'>
                <div className='bg-transparent p-1 w-full min-h-[5rem] flex justify-between'>
                    <p className='bg-transparent text-md w-[25%] min-h-[5rem] flex justify-start px-2 py-5 items-start font-semibold'>
                        form :
                    </p>
                    <div className='  bg-transparent py-4 text-md w-[74%] min-h-[5rem] flex flex-wrap justify-start gap-4 px-2'>
                        {formdata.slice(0, showAllFormsButtons ? formdata.length : 2).map((f, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedForm(f.Form)}
                                selected={selectedForm === f.Form}
                                stock_available={f.stock}
                            >
                                {f.Form}
                            </Button>
                        ))}
                        {formdata.length > 2 && (
                            <button
                                className={`more-button font-bold text-cyan-900 ${showAllFormsButtons ? 'hide' : ''}`}
                                onClick={() => setShowAllFormsButtons(!showAllFormsButtons)}
                            >
                                {showAllFormsButtons ? 'Hide..' : 'More..'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='bg-transparent p-1 w-full min-h-[5rem] flex justify-between'>
                    <p className='bg-transparent text-md w-[25%] min-h-[5rem] flex justify-start px-2 py-5 items-start font-semibold'>
                        strength :
                    </p>
                    <div className='  bg-transparent text-md py-4 w-[74%] min-h-[5rem] flex flex-wrap justify-start gap-4 px-2'>
                        {filteredStrengths.slice(0, showAllStrengthsButtons ? filteredStrengths.length : 2).map((strength, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedStrength(strength.name)}
                                // stock_available={isPrice_Available} //  NOT CORRECT HAVE TO CAHNGE
                                stock_available={strength.stock_available}
                                selected={selectedStrength === strength.name}
                            >
                                {strength.name.replace(/\+/g, ' ')}
                            </Button>
                        ))}
                        {filteredStrengths.length > 2 && (
                            <button
                                className={`more-button font-bold text-cyan-900 ${showAllStrengthsButtons ? 'hide' : ''}`}
                                onClick={() => setShowAllStrengthsButtons(!showAllStrengthsButtons)}
                            >
                                {showAllStrengthsButtons ? 'Hide..' : 'More..'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='bg-transparent p-1 w-full min-h-[5rem] flex justify-between'>
                    <p className='bg-transparent text-md w-[25%] min-h-[5rem] flex justify-start px-2 py-5 items-start font-semibold'>
                        packaging :
                    </p>
                    <div className='bg-transparent text-md py-4 w-[74%] min-h-[5rem] flex flex-wrap justify-start gap-4 px-2'>
                        {filteredPackaging.slice(0, showAllPackagingButtons ? filteredPackaging.length : 2).map((pack, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedPackaging(pack.name)}
                                stock_available={pack.stock_available}
                                selected={selectedPackaging === pack.name}
                            >
                                {pack.name}
                            </Button>
                        ))}
                        {filteredPackaging.length > 2 && (
                            <button
                                className={`more-button font-bold text-cyan-900 ${showAllPackagingButtons ? 'hide' : ''}`}
                                onClick={() => setShowAllPackagingButtons(!showAllPackagingButtons)}
                            >
                                {showAllPackagingButtons ? 'Hide..' : 'More..'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='bg-transparent w-[30%] min-h-[15rem] flex flex-col justify-center items-center'>
                <div className='bg-transparent w-full text-center text-[2rem] font-semibold'>
                    {salt_name.replace(/\+/g, ' ')}
                </div>
                <div className='bg-transparent w-full flex justify-center gap-2 items-center'>
                    <div className='bg-transparent font-semibold text-sky-900 text-lg p-2'>{selectedForm}</div> |
                    <div className='bg-transparent font-semibold text-sky-900 text-lg p-2'>{selectedStrength}</div> |
                    <div className='bg-transparent font-semibold text-sky-900 text-lg p-2'>{selectedPackaging}</div>
                </div>
            </div>
            <div className='bg-transparent w-[25%] min-h-[15rem] flex justify-center items-center'>
                {price ? (
                    <p className='bg-transparent text-center flex justify-center items-center w-[16rem] h-[5rem] text-[3rem] font-bold text-teal-950'>
                        From ₹{price}
                    </p>
                ) : (
                    <p className='text-center flex justify-center items-center border-2 w-[15rem] h-[5rem] p-4 rounded-lg border-teal-800 border-opacity-70 font-semibold bg-white'>
                        No stores selling this product near you
                    </p>
                )}
            </div>
        </div>
    );
}

export default Card;




