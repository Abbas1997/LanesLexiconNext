import Layout from '../../components/layout';

function Content({xml}) {

    return (<div id = "content" dangerouslySetInnerHTML={{__html:xml}}></div>)
}

function Post( {data,entry} ) {

    console.log(entry)
    
    function xmlParse(xml) {
        
        xml = xml.replaceAll(/\n/g, ' ')
        xml = xml.replaceAll(/<entryFree.*\/form>/g, '')
        xml = xml.replaceAll(/<hi rend="ital">/g, '<i>')
        xml = xml.replaceAll(/<\/hi>/g, '</i>')
        xml = xml.replaceAll(/<sense.*?<\/sense>/g, '<br><br>')

        return ('<h1>'+entry+'</h1>'+'<p>'+entry+xml + '</p>')
    }
    
    function createHTML(xml) {
        return {__html: xmlParse(xml)}
    }
    return (
    <Layout>
        <Content xml={xmlParse(data[0].xml)} />
    </Layout>
    )
}

export async function getServerSideProps(context) {
    //console.log('heres the port' + process.env.PORT)
    var uri = 'http://laneslexicon.herokuapp.com/api/entries/' + context.params.entry;
    var res1 = encodeURI(uri);
    const res = await fetch(res1);
    let data = await res.json();

    return {
        props: {data,entry:context.params.entry}
    }
}

export default Post


