import React, { Component } from 'react'
import { DebounceInput } from 'react-debounce-input'; // npm i react-debounce-input
import BookService from '../../service/BookService'
import PopUp from '../message/PopUp';
import ToastMessage from '../message/ToastMessage';
export default class SearchBook extends Component {

    constructor(props) {
        super(props);
        this.state = {

            keyword: '',
            dataSearch: {},

        };
    }

    // gửi lên component cha
    sendDataFilter = (data) => {
        this.props.sendDataFilter(data);
    }

    // hàm get api 
    callAPISearch = (e) => {
        BookService.getBookByTitle(e)
            .then((res) => {
                console.log(res.data.length);
                if (res.data.length !==  0 ) {
                    this.setState({
                        dataSearch: res.data,
                        keyword: e
                    })
                    this.sendDataFilter(res.data); // cơ chết bất đồng bộ setstate
                }

                else {
                    this.setState({                  
                        keyword: e ,
                        dataSearch : {}
                    })
                this.sendDataFilter([]);
                    // hiển thị thông báo
                
               
                  
                }
            });
    }

    handleInputChange = (e) => {
        if (e.target.value !== '') {
            this.callAPISearch(e.target.value.trim());

        }

        else {
            // alert("khong co dl") 
            this.sendDataFilter([]);
            // hiện thông báo 

        }


    }

    handlerMessage = (keyword) => {
        if (keyword === '') {
            return (

                <PopUp
                    titleError={"Nhập input"}
                />
            )

        }
        else if (this.state.dataSearch.length === undefined){
            return (

                <PopUp
                    titleError={"Không có data"}
                />
            )
        }
        else return;

    }

    submitSearch = () => {

        return this.handlerMessage(this.state.keyword);
    }

    render() {
        return (
            <div>

                <div className="input-group text-center">
                    {/* kĩ thuật denounce */}
                    <DebounceInput
                        debounceTimeout={800}
                        minLength={1}
                        forceNotifyByEnter={true}
                        onChange={(e) => { this.handleInputChange(e) }}
                        type="search" className="form-control rounded" placeholder="Nhập tên sách" aria-label="Search"
                    />
                   

                    <button data-toggle="modal" data-target="#exampleModalCenter"
                        onClick={() => { this.submitSearch() }}
                        type="button" className="btn btn-outline-primary">

                        <i className="fas fa-search"></i>
                    </button>
            {   this.handlerMessage(this.state.keyword) }
          












                </div>
            </div>
        )
    }
}
