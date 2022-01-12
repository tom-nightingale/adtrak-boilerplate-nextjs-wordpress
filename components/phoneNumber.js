import { useGlobalContext } from '@/pages/_app';
import ALD from '../ald.json';
import { useRouter } from 'next/router'
var store = require('store')

export default function PhoneNumber({ }) {
    const globalData = useGlobalContext();
    const router = useRouter();

    const physicalLoc = router.query.physical_loc ? router.query.physical_loc : null;
    const insterestedLoc = router.query.interested_loc ? router.query.interested_loc : null;

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
            
            // Check to see if our physicalLoc matches any of the location IDs
            if(locationID.indexOf(physicalLoc) != -1) {
                console.log(ALD.locations[location].locationName + " is matched");
                
                //Set local storage items so the location and number save on browser close.
                store.set('ald', {
                    location: ALD.locations[location].locationName,
                    number: ALD.locations[location].ppcNumber,
                    expiry: expiryDate,
                });
                
                // Set the initial values for first load
                locationName = ALD.locations[location].locationName;
                locationNumber = ALD.locations[location].ppcNumber;
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