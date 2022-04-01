import { useGlobalContext } from '@/pages/_app';
import ALD from '../ald.json';
import { useRouter } from 'next/router'
var store = require('store')

export default function PhoneNumber({ }) {
    const globalData = useGlobalContext();
    const router = useRouter();

    const physicalLoc = router.query.physical_loc ? router.query.physical_loc : null;
    const interestedLoc = router.query.interested_loc ? router.query.interested_loc : null;
    // const gCLID = router.query.GCLID ? router.query.GCLID : null;
    // const area = router.query.a ? router.query.a : null;

    /* ~ TODO - check if the query parameter matches the stored ALD localstorage - otherwise they might have changed location! ~ */

    // Set some default variables that we'll overwrite with ALD values
    let locationName;
    let locationNumber;

    // Get today's date
    let today = new Date().getTime();
    today = Number(today);

    // Set an expiry date of 30 days for the 
    let expires = new Date();
    expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days
    let expiryDate = expires.getTime();

    // Check if we have existing local storage items
    if(store.get('ald')) { // We have ALD Values stored

        console.log(store.get('ald'));
        
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
        // Loop through our ALD locations
        Object.keys(ALD.locations).forEach((location) => {
            // Get all of the location IDs from the locations
            let locationID = ALD.locations[location].locationID;
            
            // Check to see if our physicalLoc OR interestedLoc matches any of the location IDs
            if(locationID.indexOf(physicalLoc) != -1 || locationID.indexOf(interestedLoc) != -1) {

                /* Number Formatting */                
                const areaFormat = ALD.locations[location].areaFormat; // Get the number format from the JSON file
                const aldPpcNumber = ALD.locations[location].ppcNumber.replace(/ /g, ""); // remove any spaces from the string
                const formattedPpcNumber = ""; // Placeholder variable that we'll add our formatted number into
                let offset = 0; // Set a default offset as 0 - we'll change this later as we loop through our array.

                areaFormat.forEach(function(item) {
                    formattedPpcNumber += aldPpcNumber.substr(offset, item) + " "; // Add our chunk of numbers to the formattedPpcNumber string
                    offset = offset + item; // replace the offset with the value of the current item so we can start our string split at the right place.
                });
                
                //Set local storage items so the location and number save on browser close.
                store.set('ald', {
                    location: ALD.locations[location].locationName,
                    number: formattedPpcNumber,
                    expiry: expiryDate,
                });
                
                // Set the initial values for first load
                locationName = ALD.locations[location].locationName;
                locationNumber = formattedPpcNumber;
            }
        });
    }

    return(
        <a className="block ml-auto text-xl text-primary hover:text-secondary focus:text-secondary" href={`tel:${locationNumber ? locationNumber : globalData.siteOptions.defaultPhoneNumber}`}>
            {!locationName &&
                <span className="hidden lg:inline">{globalData.siteOptions.prefixPhoneNumber}</span>
            }
            <span className="inline-block mr-2 font-bold">
                {locationName ? locationName : globalData.siteOptions.defaultLocation}
            </span> 
            <span className="font-bold">
                {locationNumber ? locationNumber : globalData.siteOptions.defaultPhoneNumber}
            </span>
        </a>
    )
}