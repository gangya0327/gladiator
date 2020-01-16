import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import './index.css';
import BindPage from "./pages/BindPage";
import DetailFlight from './pages/DetailFlight';
import DetailTrain from './pages/DetailTrain';
import DetailHotel from './pages/DetailHotel';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter basename="/bind">
        <div className="cover">
            <Route path="/bind" component={BindPage} />
            <Route path="/order/detail/flight" component={DetailFlight} />
            <Route path="/order/detail/train" component={DetailTrain} />
            <Route path="/order/detail/hotel" component={DetailHotel} />
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();