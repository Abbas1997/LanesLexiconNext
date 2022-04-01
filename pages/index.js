
import Layout from '../components/layout'

function Post({ data }) {
    
  function xmlParse(xml) {
      
      xml = xml.replaceAll(/\n/g, ' ')
      xml = xml.replaceAll(/<entryFree.*\/form>/g, '')
      xml = xml.replaceAll(/<hi rend="ital">/g, '<i>')
      xml = xml.replaceAll(/<\/hi>/g, '</i>')
      xml = xml.replaceAll(/<sense.*?<\/sense>/g, '<br><br>')

      return xml
  }
  
  function createHTML(xml) {
      return {__html: xmlParse(xml)}
  }
  return <Layout>
            <div id="content">
              <h1>ا</h1>
                <p
                  dangerouslySetInnerHTML={createHTML(data[0].xml)}
                >
                </p>
            </div>
          </Layout>
}

export async function getServerSideProps(context) {
  var uri = 'http://laneslexicon.herokuapp.com/api/entries/ا';
  var res1 = encodeURI(uri);
  const res = await fetch(res1);
  let data = await res.json();

  return {
      props: {data}
  }
}

export default Post