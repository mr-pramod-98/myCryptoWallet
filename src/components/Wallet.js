import React, { Component } from 'react';
import Popup from "reactjs-popup";
import LoadingScreen from 'react-loading-screen';
import { getMyWallet, getBalance, transfer } from '../Web3/web3-contract';
import Logout from './Logout'
import './Wallet.css';

class Wallet extends Component {

	constructor(props) {
		super(props)
		this.state = {
            loading: true,
            loadingMessage: 'Initializing....',
            showPopUp: false,
            message: 'Error during transaction',
			owner: '',
            to_address: '',
			myWallet: '',
			balance: '',
			amount: 0
		}
	}

	componentDidMount() {
		getMyWallet()
			.then( wallet => {
				const { myWallet, owner } = wallet;
				this.setState({ myWallet, owner, loading: true });
				getBalance(this.state.myWallet, this.state.owner)
					.then(balance => this.setState({ balance, loading: false }));
			});
		
	}

	onInputChange = (e) => {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.value });
	};

	handelTransfer = () => {
        this.setState({ loading: true, loadingMessage: 'Transaction processing' });
		transfer(this.state.myWallet, this.state.owner, this.state.to_address, this.state.amount)
            .then(balance =>
                balance
                ? this.setState({ balance, loading: false })
                : this.setState({ loading: false, showPopUp: true }));
	}
    
    closePopUp = () => this.setState({ showPopUp: false });

	render() {
		return (
            <React.Fragment>

                <Popup
                    open={ this.state.showPopUp }
                    closeOnDocumentClick
                    onClose={ this.closePopUp }
                >
                    <div className="popup-body">
                        { this.state.message }
                        <button className="popup-close" onClick={ this.closePopUp }>X</button>
                    </div>
                </Popup>

                <LoadingScreen
                    loading={ this.state.loading }
                    bgColor='#282c34'
                    spinnerColor='#61DBFB'
                    textColor='#FFFFFF'
                    text={ this.state.loadingMessage }
                > 
                    <div className="card-main">
                        <div className="card-title">Wallet</div>
                        <div className="card-display-balance">Balance: { this.state.balance }</div>

                        <div className="card-enter-details">
                            <input className="input-address" 
                                type="text" name="to_address" placeholder="enter to address" 
                                onChange={this.onInputChange}
                            />
                        </div>
                        <div className="card-enter-details">
                            <input className="input-amount" 
                                type="number" name="amount" placeholder="enter amount" 
                                onChange={this.onInputChange}
                            />
                        </div>

                        <div className="card-actions">
                            <input className="button-transfer" type="button" value="Transfer" 
                                onClick={this.handelTransfer}
                            />
                        </div>
                    </div>

                    <Logout />
                    
                </LoadingScreen>
            </React.Fragment>	
		);
	}
}

export default Wallet;
