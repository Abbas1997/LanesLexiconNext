import Head from 'next/head'
import React from 'react'
import Link from 'next/link'
import ReactDOM from 'react-dom'; 


class Letters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roots: [],
            isFilled: false};
        this.insertRoots = this.insertRoots.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }  

    insertRoots () {

        if (this.state.isFilled == true) {
            this.setState({
                roots: '',
                isFilled: false
            })
        }
        else {
            //console.log('fetchroots');
            //console.log(this.props.letter);
            let items = [];
            fetch('/api/roots/' + this.props.letter)
            .then(function (response) {
                //console.log(response.status);
                return response.json();
            })
            .then((data) => {

                data.forEach(function(val) {
                    items.push(<Root root={val.word} key={val.word} />)
                });
                this.setState({
                    roots: items,
                    isFilled: true
                })
            });
            }
    }

    handleClick () {
        if (document.getElementById('con').clientWidth < 1200) {
            document.getElementById('panel').style.display = 'none'
        }
    }

    render () {
        return  <div>
                    <div class="list">
                        <span 
                            onClick={this.insertRoots} 
                            class="material-icons arrows"
                        >
                            arrow_right
                        </span> 
                        <div class="letters">
                            <Link href={"/entries/"+this.props.letter}>
                                <span id='letters' onClick={this.handleClick}>
                                    {this.props.letter}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {this.state.roots}
                    </div>
                </div>
    }
    
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {words: [],
            isFilled: false};
        this.insertWords = this.insertWords.bind(this);
    }

    insertWords () {

        if (this.state.isFilled == true) {
            this.setState({
                words: '',
                isFilled: false
            })
        }
        else {
            //console.log('fetchroots');
            console.log(this.props.root);
            let items = [];
            fetch('/api/words/' + this.props.root)
            .then(function (response) {
                console.log(response.status);
                return response.json();
            })
            .then((data) => {
                data.forEach(function(val) {
                    items.push(<Word word={val.word} />)
                });
                this.setState({
                    words: items,
                    isFilled: true
                })
            });
            }

    }
    
    render () {
        return <div>
                   <div class="list2">
                       <span 
                           onClick={this.insertWords} 
                           class="material-icons arrows "
                        >
                           arrow_right
                        </span>
                        <div class="roots">
                            {this.props.root}
                        </div>
                    </div>
                    <div>
                        {this.state.words}
                    </div>
                </div>
    }
}

class Word extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        if (document.getElementById('con').clientWidth < 1200) {
            document.getElementById('panel').style.display = 'none'
        }
    }

    render() {
        return <div class="list3">
                   <span class="material-icons arrows ">
                        arrow_right
                    </span>
                    <Link href={"/entries/"+this.props.word}>
                        <div class="words">
                            <span onClick = {this.handleClick} id='words'>
                            {this.props.word}
                            </span>
                        </div>
                    </Link>
                </div>
    }
}

const SearchResult = () => {
    return <p>Search Result</p>
}

const Search = () => {

    let dropRef = React.createRef();

    const getResult = () => {
        if(document.getElementById('con').clientWidth < 1200) {
            document.getElementById('panel').style.display = 'none';
        }
        fetch('/api/search/' + dropRef.current.value).
        then( (response) => {
            console.log(response.status)
            return response.json()
        }).
        then((response) => {
            console.log(response.length)
            if(response.length != 0) {
                document.getElementById("content").innerHTML = "<div id= \"searchresult\" ></div>";
                response.forEach(element => {
                    console.log(element)
                    let hi = document.createElement('a');
                    hi.textContent = element.word
                    hi.setAttribute('href', '/entries/'+element.word)
                    hi.setAttribute('id','searchlinks')
                    document.getElementById("searchresult").appendChild(hi)
                })
            } else {
                document.getElementById("content").innerHTML = '<p>No results found. Please try the index.</p>';
            }
        })
    }

    function closePanel () {
        dropRef.current.parentElement.parentElement.parentElement.style.display = 'none';
    }

    return (
        <div id="c2">
            <a 
                onClick = {getResult}
                id="sc" 
                class="material-icons"
            >
                search
            </a>
            <form id="c21">
                <input 
                    ref = {dropRef}
                    id="sb" 
                    type="search" 
                    placeholder="Search" 
                />
            </form>
            <span id="c22" className='material-icons' onClick={closePanel}>close</span>
        </div>
    )
}

export default function Layout({ children }) {

    let bRef = React.createRef();
    function displaySearch() {
        bRef.current.style.display = 'block';
    }    
    return (
        <div id ='maincontainer'>
            <Head>
                <title>Lane's Arabic English Lexicon</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div id="con">
                <div id="c1">
                    <span id= 'msb'>
                    <span id='msb1'  onClick={displaySearch} className='material-icons'>
                        search
                    </span>
                    </span>
                    <a  href="/" id="hlink">
                    Lane's Arabic English Lexicon
                    </a>
                    <span id="s3"></span>
                </div>
                <div id="main">
                    <div ref={bRef} id="panel">
                        <Search />
                        <div id="c3">
                            <div class="list"><a class="link" href="https://github.com/laneslexicon/LexiconDatabase">
                                Original Database</a></div>
                            <div id="rcontainer">
                                <Letters letter='ا' />
                                <Letters letter='ب' />
                                <Letters letter='ت' />
                                <Letters letter='ث' />
                                <Letters letter='ج' />
                                <Letters letter='ح' />
                                <Letters letter='خ' />
                                <Letters letter='د' />
                                <Letters letter='ذ' />
                                <Letters letter='ر' />
                                <Letters letter='ز' />
                                <Letters letter='س' />
                                <Letters letter='ش' />
                                <Letters letter='ص' />
                                <Letters letter='ض' />
                                <Letters letter='ط' />
                                <Letters letter='ظ' />
                                <Letters letter='ع' />
                                <Letters letter='غ' />
                                <Letters letter='ف' />
                                <Letters letter='ق' />
                                <Letters letter='ك' />
                                <Letters letter='ل' />
                                <Letters letter='م' />
                                <Letters letter='ن' />
                                <Letters letter='و' />
                                <Letters letter='ى' />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
                
            </div>
        </div>
        );
  }
