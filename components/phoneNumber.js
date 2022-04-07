import { useGlobalContext } from '@/pages/_app';
import ALD from '../ald.json';
import { useRouter } from 'next/router'
var store = require('store')

export default function PhoneNumber({ showPrefix, showLocation, prefixClasses, locationClasses, numberClasses }) {

    const globalData = useGlobalContext();
    const router = useRouter();

    const physicalLoc = router.query.physical_loc ? router.query.physical_loc : null;
    const interestLoc = router.query.interest_loc ? router.query.interest_loc : null;
    // const gCLID = router.query.GCLID ? router.query.GCLID : null;
    const campaignQuery = router.query.campaign ? router.query.campaign : null;

    // Set some default variables that we'll overwrite with ALD values
    let locationName;
    let locationNumber;

    /* Setting an expiration date */
    // Get today's date
    let today = new Date().getTime();
    today = Number(today);

    // Set an expiry date of 30 days for the 
    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days
    let expiryDate = expires.getTime();

    /* Matching function to match the query param to the ID of a location in ald.json */
    function matchPPC(type) {
        // Loop through our ALD locations
        Object.keys(ALD[type]).forEach((item) => {
            // Get all of the location IDs from the locations. Will return an array of IDs
            let itemID = ALD[type][item].objectIds;
            
            // Check to see if our physicalLoc OR interestedLoc matches any of the location IDs
            if(itemID.indexOf(physicalLoc) != -1 || itemID.indexOf(interestLoc) != -1 || itemID.indexOf(campaignQuery) != -1) {

                /* Number Formatting */                
                const numberFormat = ALD[type][item].numberFormat; // Get the number format from the JSON file
                const ppcNumber = ALD[type][item].ppcNumber.replace(/ /g, ""); // remove any spaces from the string
                const formattedPpcNumber = ""; // Placeholder variable that we'll add our formatted number into
                let offset = 0; // Set a default offset as 0 - we'll change this later as we loop through our array.

                numberFormat.forEach(function(item) {
                    formattedPpcNumber += ppcNumber.substr(offset, item) + " "; // Add our chunk of numbers to the formattedPpcNumber string
                    offset = offset + item; // replace the offset with the value of the current item so we can start our string split at the right place.
                });
                
                //Set local storage items so the location and number save on browser close.
                store.set('ald', {
                    location: ALD[type][item].objectName,
                    number: formattedPpcNumber,
                    expiry: expiryDate,
                });
                
                // Set the initial values for first load
                locationName = ALD[type][item].objectName;
                locationNumber = formattedPpcNumber;
            }
        });
    }

    /* Check if we have a new query param and update the local storage */
    if(physicalLoc || interestLoc) {
        matchPPC("locations");
    }

    if(campaignQuery) {
        matchPPC("campaigns");
    }

    /* Check if we have existing local storage items
       No query string passed to the URL so we use the stored values as long as they are not expired */
    if(store.get('ald')) {        
        // We have values stored, so check if they have expired.
        // Check if todays date is less than the expiration date
        if(today < store.get('ald').expiry) {
            locationName = store.get('ald').location;
            locationNumber = store.get('ald').number;
        }
        // If the date is beyond the expiration we need to clear all the stored values.
        else {
            store.clearAll();
        }
    }
    else { // We don't have any values set so we can check if the query string matches.
        if(physicalLoc || interestLoc) {
            matchPPC("locations");
        }
        else if(campaignQuery) {
            matchPPC("campaigns");
        }
    }

    return ( // Our return statement to output our prefix, location and phone number
        <div className="ml-auto text-xl text-primary">
            
            {(!locationName && showPrefix) &&
                <span className={`${prefixClasses ? prefixClasses : ''}`}>{globalData.siteOptions.prefixPhoneNumber}</span>
            }

            {showLocation &&
                <span className={`${locationClasses ? locationClasses : ''}`}>
                    {locationName ? locationName : globalData.siteOptions.defaultLocation}
                </span>
            }

            <a className={`${numberClasses ? numberClasses : ''}`} href={`tel:${locationNumber ? locationNumber : globalData.siteOptions.defaultPhoneNumber}`}>
                {locationNumber ? locationNumber : globalData.siteOptions.defaultPhoneNumber}
            </a>
            
        </div>
    )
}