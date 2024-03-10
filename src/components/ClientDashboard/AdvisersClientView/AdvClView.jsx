import React from 'react';
import AdvisorsCarousel from "./AdvisorsCarousel";
import advidata from "./advi.json";

function AdvClView(){
    return(
        <div>
            <AdvisorsCarousel advisors={advidata.listOfNamesOfAdvisors} />
        </div>
    );
}

export default AdvClView;