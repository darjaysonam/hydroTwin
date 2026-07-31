import React from "react";
import Header from "../components/Header/Header";

import DashboardGrid from "../layout/DashboardGrid";
import Panel from "../layout/Panel";

import useWebSocket from "../hooks/useWebSocket";

// Core Components
import StatusCards from "../components/StatusCards/StatusCards";

import DigitalTwinSection from "../layout/dashboardSections/DigitalTwinSection";

import Gauges from "../components/Gauges/Gauges";
import Charts from "../components/Charts/Charts";

import Health from "../components/Health/Health";
import AIEngineMetrics from "../components/AIEngineMetrics/AIEngineMetrics";

import Historian from "../components/Historian/Historian";
import EnergyAnalytics from "../components/EnergyAnalytics/EnergyAnalytics";

import AlarmPanel from "../components/AlarmPanel/AlarmPanel";
import PlantLogs from "../components/PlantLogs/PlantLogs";


export default function Dashboard() {

    const telemetryPayload = useWebSocket();


    //-----------------------------------------
    // SENSOR TELEMETRY
    //-----------------------------------------

    const sensors = {

        vibration:
            telemetryPayload?.vibration ?? 0,

        hydraulic_pressure:
            telemetryPayload?.pressure ??
            telemetryPayload?.hydraulic_pressure ??
            0,

        generator_output:
            telemetryPayload?.power ??
            telemetryPayload?.generator_output ??
            0,

        bearing_temperature:
            telemetryPayload?.temperature ??
            telemetryPayload?.bearing_temperature ??
            0,

        nozzle_position:
            telemetryPayload?.nozzle_position ??
            37

    };


    //-----------------------------------------
    // AI STATUS
    //-----------------------------------------

    const status = {

        healthScore:
            Number(
                telemetryPayload?.healthScore ?? 100
            ),

        predictedHealthScore:
            Number(
                telemetryPayload?.predictedHealthScore ??
                telemetryPayload?.healthScore ??
                100
            ),

        remainingHours:
            Number(
                telemetryPayload?.predictedRUL ??
                telemetryPayload?.remainingHours ??
                0
            ),

        anomalyScore:
            Number(
                telemetryPayload?.anomalyScore ?? 0
            ),

        alarmState:
            telemetryPayload?.severity ??
            "normal"

    };


    //-----------------------------------------
    // POWER TELEMETRY
    //-----------------------------------------

    const telemetry = {

        power:
            Number(
                telemetryPayload?.power ?? 0
            )

    };


    return (

        <div>

            <Header />

            <DashboardGrid>


                {/*=================================================*/}
                {/* STATUS CARDS */}
                {/*=================================================*/}

                <section className="col-span-full">

                    <StatusCards
                        status={status}
                        telemetry={telemetry}
                    />

                </section>



                {/*=================================================*/}
                {/* DIGITAL TWIN */}
                {/*=================================================*/}

                <section>

                    <DigitalTwinSection
                        sensors={sensors}
                        status={status}
                    />

                </section>


                <section>

                    <Panel title="Live Sensor Instrumentation">

                        <Gauges sensors={sensors} />

                    </Panel>

                </section>


                <section>

                    <Panel title="Live Sensor Trend Analytics">

                        <Charts sensors={sensors} />

                    </Panel>

                </section>



                {/*=================================================*/}
                {/* AI ANALYTICS */}
                {/*=================================================*/}

                <section>

                    <Panel title="Asset Prognostics">

                        <Health
                            status={status}
                        />

                    </Panel>

                </section>


                <section>

                    <AIEngineMetrics
                        status={status}
                    />

                </section>



                {/*=================================================*/}
                {/* HISTORIAN */}
                {/*=================================================*/}

                <section>

                    <Historian
                        status={status}
                    />

                </section>


                <section>

                    <EnergyAnalytics
                        sensors={sensors}
                    />

                </section>



                {/*=================================================*/}
                {/* OPERATIONS */}
                {/*=================================================*/}

                <section>

                    <Panel title="Alarm Control Center">

                        <AlarmPanel
                            alarmState={status.alarmState}
                            sensors={sensors}
                        />

                    </Panel>

                </section>


                <section>

                    <Panel title="Plant Operations Logs">

                        <PlantLogs />

                    </Panel>

                </section>


            </DashboardGrid>

        </div>

    );

}