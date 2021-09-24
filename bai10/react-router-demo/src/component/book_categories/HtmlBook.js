import React, { Component } from 'react'
import { BookConstant } from '../../constant/BookConstant';
import BookService from '../../service/BookService'
import ToastMessage from '../message/ToastMessage';
import BookIntro from './BookIntro';

export default class Html extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            pageSize: 1,
            isError: false


        };
    }

    parentCallback = (pageSize) => {
        this.props.parentCallback(Math.ceil(pageSize));
    }

    componentDidMount() {
        // get All Book by Categories
        var self = this;
        BookService.getBookByCategoryPagination(BookConstant.HTML_BOOK, this.props.page - 1, BookConstant.TOTAL_PAGE_LIMIT)
            .then((res) => {
                console.log(res);
                this.setState({
                    books: res.data.data,
                    pageSize: res.data.paging.totalPage
                });
                this.parentCallback(this.state.pageSize);

            })
            .catch(function (err) {
                if (err.request) {
                    self.setState({
                        isError: true
                    });

                }

            })

        // khi click chi tiết rồi quay lại đúng page html , props k đổi nên phải dùng hàm này
        // this.callAPIPagination(this.props.page)

    }


    callAPIPagination = (nextProps) => {
        // BookService.paginationPage(1,nextProps,  BookConstant.TOTAL_PAGE_LIMIT)
        var self = this;
        BookService.getBookByCategoryPagination(BookConstant.HTML_BOOK, nextProps, BookConstant.TOTAL_PAGE_LIMIT)

            .then((res) => {
                this.setState({
                    books: res.data.data

                });

            })
            .catch(function (err) {
                if (err.request) {
                    self.setState({
                        isError: true
                    });

                }

            })
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.

    componentWillReceiveProps(nextProps) {

        // chặn việc call api thừa
        if (nextProps.page !== this.props.page) {
            this.callAPIPagination(nextProps.page - 1);
        }

    }

    render() {


        return (
            <div className="container">
                HTML BOOK
                <div className="row">

                    {
                        (this.state.isError === true) ? (<ToastMessage />) :

                            (
                                this.state.books.map((book, index) => {
                                    return (
                                        <BookIntro
                                            key={index}
                                            id={book.id}
                                            author={book.authorId}
                                            img={book.Url}
                                            title={book.title}

                                        />


                                    )
                                })
                            )
                    }
                </div>

            </div>
        )
    }
}