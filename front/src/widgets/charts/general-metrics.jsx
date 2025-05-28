import React from "react";
import { 
  ArrowUpIcon, 
  ArrowRightIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

import { GeneralSummary } from "@/api";
import { FeelFlowSpinner } from "@/components";

let statisticsCardsData = [];

export function GeneralMetrics() {
  const [fetch, setFetch] = React.useState(false);
  const [cardData, setCardData] = React.useState();


  const FetchData = async () => {
    try {
      const data = await GeneralSummary();
      setCardData(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  }

  React.useEffect(() => {
    if (!fetch) {
      setFetch(true);
      FetchData();
    }
  }, [fetch]) 

  // ######################################################################################
  // ########### OBTENGO EL ICONO Y COLOR PARA LAS 3 METRICAS NUMERICAS         ###########
  // ######################################################################################
  const getIconAndColor = (value) => { 
    if (value >= 70) return { icon: ArrowUpIcon, color: "text-green-500" };
    if (value >= 40) return { icon: ArrowRightIcon, color: "text-yellow-500" };
    return { icon: ArrowDownIcon, color: "text-red-500" };
  };

  // ######################################################################################
  // ########### OBTENGO EL ICONO Y COLOR PARA EL ESTADO EMOCIONAL              ###########
  // ######################################################################################
  const getEmotionIconAndColor = (emotion) => {
    switch (emotion.toLowerCase()) {
      case "positivo":
        return { icon: ArrowUpIcon, color: "text-green-500" };
      case "menor":
        return { icon: ArrowRightIcon, color: "text-yellow-500" };
      case "negativo":
        return { icon: ArrowDownIcon, color: "text-red-500" };
      default:
        return { icon: ArrowRightIcon, color: "text-gray-500" }; // fallback
    }
  };

  const isCardDataValid = (data) =>
    data &&
    data.emotionalState &&
    data.generalHappiness &&
    data.kudosSent &&
    data.participationOnModules;

  if (isCardDataValid(cardData)) {
    statisticsCardsData = [
      {
        title: "Estado Emocional Promedio",
        value: cardData.emotionalState,
        ...getEmotionIconAndColor(cardData.emotionalState),
      },
      {
        title: cardData.generalHappiness.nameHappiness,
        value: `${cardData.generalHappiness.percentHappiness}%`,
        ...getIconAndColor(cardData.generalHappiness.percentHappiness),
      },
      {
        title: cardData.kudosSent.name,
        value: cardData.kudosSent.kudosQuantity,
        ...getIconAndColor(cardData.kudosSent.kudosQuantity),
      },
      {
        title: cardData.participationOnModules.name,
        value: `${cardData.participationOnModules.participationPercentage}%`,
        ...getIconAndColor(cardData.participationOnModules.participationPercentage),
      },
    ];
  } else {
    return (
      <FeelFlowSpinner />
    )
  }

  return (
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, value, color }) => (
        <div key={title} className="p-4 shadow-md rounded-lg flex items-center gap-4 border card">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full  ${color}`}>
            {React.createElement(icon, {
              className: "w-6 h-6",
            })}
          </div>
          <div>
            <h5 className="text-sm">{title}</h5>
            <p className="text-lg">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeneralMetrics;