import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/metaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./CheckoutSteps.js";
import { useNavigate } from "react-router-dom";

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { shippingInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            alert.error("Phone number should be 10 digits long");
            return;
        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
        );
        navigate("/order/confirm");

    };

    return (
        <Fragment>
            <MetaData title="Shipping Details" />

            <CheckoutSteps activeStep={0} />

            <div className="shipping-container">
                <div className="shipping-box">
                    <h2 className="shipping-heading">Shipping Details</h2>

                    <form
                        className="shopping-form"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >
                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Enter Your Address"
                                required
                                value={address}
                                onchange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <LocationCityIcon />
                            <input
                                type="text"
                                placeholder="Enter Your City"
                                required
                                value={city}
                                onchange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Enter Your Pin Code"
                                required
                                value={pinCode}
                                onchange={(e) => setPinCode(e.target.value)}
                            />
                        </div>

                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Enter Your Phone Number"
                                required
                                value={phoneNo}
                                onchange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onchange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))
                                }

                            </select>
                        </div>

                        {country &&
                            (
                                <div>
                                    <TransferWithinAStationIcon />
                                    <select
                                        required
                                        value={state}
                                        onChnage={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            )
                        }

                        <input
                            type="submit"
                            value="Continue"
                            className="shipping-btn"
                            disabled={state ? false : true}
                        />

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Shipping;