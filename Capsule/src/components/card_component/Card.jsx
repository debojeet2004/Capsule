import React, { useState, useEffect } from 'react';
import { Button } from '../components';
import { stock_check_forForms , stock_check_forStrengths, checkFormsForNonNullIds } from './StockAvalibility';



function Card({ salt_name, forms, salt_json, }) {


    const [selectedForm, setSelectedForm] = useState(forms[0]);
    const [selectedStrength, setSelectedStrength] = useState(null);
    const [selectedPackaging, setSelectedPackaging] = useState(null);

    const [show_All_Forms_Buttons, set_show_All_Forms_Buttons] = useState(false);
    const [show_All_Strengths_Buttons, set_show_All_Strengths_Buttons] = useState(false);
    const [show_All_Packaging_Buttons, set_show_All_Packaging_Buttons] = useState(false);

    const [filteredStrengths, setFilteredStrengths] = useState([]);
    const [filteredPackaging, setFilteredPackaging] = useState([]);
    const [price, setPrice] = useState(); // state for price
    const [StockAvalibility, setStockAvalibility] = useState(stock_check_forForms(salt_json));//  NOT CORRECT HAVE TO CAHNGE

    // console.log(checkFormsForNonNullIds(data));


    // useEffect(() => {
    //     if(stock_check_forForms(salt_json)){
    //         // console.log('Stock Available');
    //         // setStockAvalibility(true);
    //     }
    //     else{
    //         // console.log('Stock Not Available');
    //         // setStockAvalibility(false);
    //     }
    // }, [salt_json])
    

    useEffect(() => {
        if (selectedForm && salt_json[selectedForm]) {
            const strengths = Object.keys(salt_json[selectedForm]);
            // console.log(stock_check(salt_json))
            setFilteredStrengths(strengths.map(str => ({ name: str })));//, stock_available: { availability }
            setSelectedStrength(strengths[0]);
            
        } else {
            setFilteredStrengths([]);
            setSelectedStrength(null);
        }
    }, [selectedForm, salt_json]);

    useEffect(() => {
        if (selectedForm && selectedStrength && salt_json[selectedForm] && salt_json[selectedForm][selectedStrength]) {
            const packagingOptions = Object.keys(salt_json[selectedForm][selectedStrength]);
            const strengthdata = salt_json[selectedForm][selectedStrength];
            // console.log(strengthdata);
            const Strengthstockcheck = stock_check_forStrengths(strengthdata)
            console.log(Strengthstockcheck);
            setFilteredPackaging(packagingOptions.map(pack => ({ name: pack, stock_available: { Strengthstockcheck } })));// , stock_available: { availability }
            setSelectedPackaging(packagingOptions[0]);
        } else {
            setFilteredPackaging([]);
            setSelectedPackaging(null);
        }
    }, [selectedForm, selectedStrength, salt_json]);



    useEffect(() => {
        // console.log('Checking price for:', selectedForm, selectedStrength, selectedPackaging);
        if (
            selectedForm &&
            selectedStrength &&
            selectedPackaging &&
            salt_json[selectedForm] &&
            salt_json[selectedForm][selectedStrength] &&
            salt_json[selectedForm][selectedStrength][selectedPackaging]
        ) {
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
                    Object.values(item.value).flatMap(obj => {
                        // console.log("Current Object:", obj);
                        return obj.selling_price;
                    })
                );
                const lowestPrice = Math.min(...sellingPrices)
                // console.log(lowestPrice);
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
                        {forms.slice(0, show_All_Forms_Buttons ? forms.length : 2).map((form, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedForm(form)}
                                selected={selectedForm === form}
                                stock_available={StockAvalibility}  //  NOT CORRECT HAVE TO CAHNGE
                            >
                                {form}
                            </Button>
                        ))}
                        {forms.length > 2 && (
                            <button
                                className={`more-button font-bold text-cyan-900 ${show_All_Forms_Buttons ? 'hide' : ''}`}
                                onClick={() => set_show_All_Forms_Buttons(!show_All_Forms_Buttons)}
                            >
                                {show_All_Forms_Buttons ? 'Hide..' : 'More..'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='bg-transparent p-1 w-full min-h-[5rem] flex justify-between'>
                    <p className='bg-transparent text-md w-[25%] min-h-[5rem] flex justify-start px-2 py-5 items-start font-semibold'>
                        strength :
                    </p>
                    <div className='  bg-transparent text-md py-4 w-[74%] min-h-[5rem] flex flex-wrap justify-start gap-4 px-2'>
                        {filteredStrengths.slice(0, show_All_Strengths_Buttons ? filteredStrengths.length : 2).map((strength, index) => (
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
                                className={`more-button font-bold text-cyan-900 ${show_All_Strengths_Buttons ? 'hide' : ''}`}
                                onClick={() => set_show_All_Strengths_Buttons(!show_All_Strengths_Buttons)}
                            >
                                {show_All_Strengths_Buttons ? 'Hide..' : 'More..'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='bg-transparent p-1 w-full min-h-[5rem] flex justify-between'>
                    <p className='bg-transparent text-md w-[25%] min-h-[5rem] flex justify-start px-2 py-5 items-start font-semibold'>
                        packaging :
                    </p>
                    <div className='bg-transparent text-md py-4 w-[74%] min-h-[5rem] flex flex-wrap justify-start gap-4 px-2'>
                        {filteredPackaging.slice(0, show_All_Packaging_Buttons ? filteredPackaging.length : 2).map((pack, index) => (
                            <Button
                                key={index}
                                onClick={() => setSelectedPackaging(pack.name)}
                                // stock_available={isPrice_Available} //  NOT CORRECT HAVE TO CAHNGE
                                // stock_available={pack.stock_available}
                                selected={selectedPackaging === pack.name}
                            >
                                {pack.name}
                            </Button>
                        ))}
                        {filteredPackaging.length > 2 && (
                            <button
                                className={`more-button font-bold text-cyan-900 ${show_All_Packaging_Buttons ? 'hide' : ''}`}
                                onClick={() => set_show_All_Packaging_Buttons(!show_All_Packaging_Buttons)}
                            >
                                {show_All_Packaging_Buttons ? 'Hide..' : 'More..'}
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






// Define checkProductAvailability function
// const checkProductAvailability = (pharmacies) => {
//     // Check if pharmacies is not undefined and is an object
//     if (pharmacies && typeof pharmacies === 'object') {
//         return Object.keys(pharmacies).some((key) => pharmacies[key] !== null);
//     }
//     // Return false if pharmacies is undefined or null or not an object
//     return false;
// };

// Define checkAvailabilityRecursive function
// const checkAvailabilityRecursive = (forms) => {
//     // Check if forms is not undefined and is an object
//     if (forms && typeof forms === 'object') {
//         return Object.keys(forms).some((formType) => {
//             const dosages = forms[formType];
//             return Object.keys(dosages).some((dosage) => {
//                 const quantities = dosages[dosage];
//                 return Object.keys(quantities).some((quantity) => {
//                     const pharmacies = quantities[quantity];
//                     return checkProductAvailability(pharmacies);
//                 });
//             });
//         });
//     }
//     // Return false if forms is undefined or null or not an object
//     return false;
// };



