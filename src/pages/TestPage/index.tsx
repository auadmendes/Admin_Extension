import { useState } from "react";

import { Spinner } from "../../components/Spinner";
import api from "../../services/api";

// import { GrPrevious } from "react-icons/gr";
//import trustlyLogoImage from '../../assets/trustlyGreen.png';
interface EventData {
    title: string;
    tags: string[];
    dates: string[];
    ticketUrl: string[];
    location: string;
    imageUrl: string;
}

export function TestPage() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getEvents(): Promise<void> {
        setIsLoading(true);
    
        try {
          const response = await api.get(`http://localhost:3000/events`);
          
          console.log(JSON.stringify(response.data.eventsData))
          setEvents(response.data.eventsData)
          
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Epaa' + error)
        } finally {
          setIsLoading(false)
        }
    
      }


    //    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     event.preventDefault();
    
    //     const file = event.target.files?.[0]; // Get the first selected file
    //     if (file) {
    //       const reader = new FileReader();
    //       reader.onload = function (e) {
    //         if (e.target?.result) {
    //           const content = e.target.result.toString(); // File content as a string
    //           const parsedData = parseCsvContent(content); // Parse CSV content
    //          // setCsvData(parsedData); // Update state with parsed CSV data
    //         }
    //       };
    //       reader.readAsText(file); // Read the file as text
    //     }
    //     //alert(JSON.stringify(csvData))
    //     //setIsActive(true)
    //   }

    return (
     <div className="text-white w-screen bg-gray-500 h-80 flex flex-col items-center justify-center">
        <span>Hello World</span>
        <div>
        <button 
              className='bg-white text-gray-900 p-2 w-28'
              onClick={getEvents}
              >
              {isLoading ? (
                <Spinner />
              ):
              (
                <span>Eventos</span>)
              }
        </button>
        </div>
        <div className="flex flex-row w-full">
        {events.map((item) => {
            return (
              <div className='text-white'>
                <img src={item.imageUrl} alt="" />
                <h3>{item.title}</h3>
                {item.dates.map((date) => {
                 if(date !== '+')
                  return (
                    <a className='' 
                      href={`https://www.ingressodigital.com${item.ticketUrl[0].replace('.','')}`}>
                      {date}
                      </a>
                  )
                })}
              </div>
            )
          })}
        </div>
     </div>
    )
}

//checking the HTML below to scrap ...

  // <div class="CustomGridstyle__CustomGridRow-sc-1ce1n9e-1 gIFLaK">
      // <div class="CustomGridstyle__CustomGridCardType-sc-1ce1n9e-2 jMNblV">
      //    <a class="EventCardstyle__CardLink-sc-1rkzctc-3 eDXoFM sympla-card" data-bannerid="2361936" data-name="Modulação hormonal feminina, Nutrição e Treinamento no esporte" data-position="1" data-creative=".search.city-vitoria-es.filter_city-vitoria-es.type-normal.response_type-event-card.start-15d.sort-location-score" id="2361936" href="https://www.sympla.com.br/evento/modulacao-hormonal-feminina-nutricao-e-treinamento-no-esporte/2361936" target="_top" title="Modulação hormonal feminina, Nutrição e Treinamento no esporte" aria-label="Modulação hormonal feminina, Nutrição e Treinamento no esporte, em Empório Asterix, Vitória, ES" data-gtm-vis-recent-on-screen2439357_246="697039" data-gtm-vis-first-on-screen2439357_246="697039" data-gtm-vis-total-visible-time2439357_246="100" data-gtm-vis-has-fired2439357_246="1" data-gtm-vis-recent-on-screen2439357_1530="697205" data-gtm-vis-first-on-screen2439357_1530="697205" data-gtm-vis-total-visible-time2439357_1530="100" data-gtm-vis-has-fired2439357_1530="1">
      //       <div class="EventCardstyle__CardContainer-sc-1rkzctc-4 hRMJAV">
      //          <div class="EventCardstyle__EventCardContainer-sc-1rkzctc-0 ffmhzT">
      //             <div class="EventCardstyle__ImageContainer-sc-1rkzctc-1 iiFeFT image-container">
      //                <div class="sc-1g4kp1c-0 bzvpyc">
      //                   <img src="https://images.sympla.com.br/65df743f94335-xs.jpg" alt="" width="262px" height="134px" loading="lazy" class="sc-1g4kp1c-1 doBuIn">
      //                   <div data-test-id="divPlaceholderBox" class="sc-1g4kp1c-2 gItSYO">
                           
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="EventCardstyle__EventInfo-sc-1rkzctc-5 hRaRCu">
      //                <div class="EventCardstyle__EventDate-sc-1rkzctc-6 kzojOQ">
      //                   <div class="sc-1sp59be-0 dwFxpq">
      //                      <div class="sc-1sp59be-1 fZlvlB">04 Mai</div>
      //                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      //                         <path fill-rule="evenodd" d="M15.494 12.6a.85.85 0 01-.253.51l-5.246 5.14a.89.89 0 01-.847.22.868.868 0 01-.619-.61.847.847 0 01.23-.828l4.624-4.532L8.76 7.968a.847.847 0 01-.23-.829.868.868 0 01.619-.61.89.89 0 01.847.221l5.246 5.14a.847.847 0 01.253.71z"></path>
      //                      </svg>
      //                      <div class="sc-1sp59be-1 fZlvlB">05 Mai</div>
      //                   </div>
      //                </div>
      //                <h3 class="EventCardstyle__EventTitle-sc-1rkzctc-7 hwgihT animated fadeIn">Modulação hormonal feminina, Nutrição e Treinamento no esporte</h3>
      //                <div class="EventCardstyle__EventLocation-sc-1rkzctc-8 heVhPT animated fadeIn">Empório Asterix - Vitória, ES</div>
      //             </div>
      //          </div>
      //       </div>
      //    </a>
      // </div>
      // <div class="CustomGridstyle__CustomGridCardType-sc-1ce1n9e-2 jMNblV">
      //    <a class="EventCardstyle__CardLink-sc-1rkzctc-3 eDXoFM sympla-card" data-bannerid="2377560" data-name="CURSO FLORAIS DE BACH" data-position="2" data-creative=".search.city-vitoria-es.filter_city-vitoria-es.type-normal.response_type-event-card.start-42d.sort-location-score" id="2377560" href="https://www.sympla.com.br/evento/curso-florais-de-bach/2377560" target="_top" title="CURSO FLORAIS DE BACH" aria-label="CURSO FLORAIS DE BACH, em CEMAP - Centro Empresarial Mario Antônio Pereira, Vila Velha, ES" data-gtm-vis-recent-on-screen2439357_246="697052" data-gtm-vis-first-on-screen2439357_246="697052" data-gtm-vis-total-visible-time2439357_246="100" data-gtm-vis-has-fired2439357_246="1" data-gtm-vis-recent-on-screen2439357_1530="697215" data-gtm-vis-first-on-screen2439357_1530="697215" data-gtm-vis-total-visible-time2439357_1530="100" data-gtm-vis-has-fired2439357_1530="1">
      //       <div class="EventCardstyle__CardContainer-sc-1rkzctc-4 hRMJAV">
      //          <div class="EventCardstyle__EventCardContainer-sc-1rkzctc-0 ffmhzT">
      //             <div class="EventCardstyle__ImageContainer-sc-1rkzctc-1 iiFeFT image-container">
      //                <div class="sc-1g4kp1c-0 bzvpyc">
      //                   <img src="https://images.sympla.com.br/65ef9bdbd336f-xs.jpg" alt="" width="262px" height="134px" loading="lazy" class="sc-1g4kp1c-1 doBuIn">
      //                   <div data-test-id="divPlaceholderBox" class="sc-1g4kp1c-2 gItSYO">
                          
      //                   </div>
      //                </div>
      //             </div>
      //             <div class="EventCardstyle__EventInfo-sc-1rkzctc-5 hRaRCu">
      //                <div class="EventCardstyle__EventDate-sc-1rkzctc-6 kzojOQ">
      //                   <div class="sc-1sp59be-0 dwFxpq">
      //                      <div class="sc-1sp59be-1 fZlvlB">Sex, 31 Mai · 18:30</div>
      //                   </div>
      //                </div>
      //                <h3 class="EventCardstyle__EventTitle-sc-1rkzctc-7 hwgihT animated fadeIn">CURSO FLORAIS DE BACH</h3>
      //                <div class="EventCardstyle__EventLocation-sc-1rkzctc-8 heVhPT animated fadeIn">CEMAP - Centro Empresarial Mario Antônio Pereira - Vila Velha, ES</div>
      //             </div>
      //          </div>
      //       </div>
      //    </a>
      // </div>
      // </div>