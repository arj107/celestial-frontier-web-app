<template>
    <apexchart 
        type="line"
        :height="$store.state.configurationsWeaponDamageChartsHeight" 
        :options="weaponDamageChartOptions" 
        :series="weaponDamageSeriesSet"
    ></apexchart>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "WeaponDamageChart",

    components: {

    },

    props: {
        weaponFrame: {
            type: Object,
            required: true
        },
        payload: {
            type: Object,
            required: true
        },
        allowClick: {
            type: Boolean,
            required: false,
            default: true
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    data: () => ({
        
    }),

    computed: {
        ...mapState([
            'validationRules',
        ]),
        weaponDamageChartOptions () {
            return {
                chart: {
                    animations: {
                        enabled: false,
                    },
                    background: 'rgba(0,0,0,0)',
                    fontFamily: 'Roboto, sans-serif',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#E91E63'],
                legend: {
                    showForSingleSeries: true,
                },
                dataLabels: {
                    enabled: true,
                    // offsetY: 15,
                    style: {
                        fontSize: '11px'
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '95%',
                        borderRadius: 5
                    }
                },
                tooltip: {
                    shared: true,
                    followCursor: true,
                    intersect: false,
                },
                title: {
                    // text: `${this.$store.state.editingBattlecruiserConfiguration.WeaponFrame2.Title} / ${this.$store.state.editingBattlecruiserConfiguration.Payload2.Title}`,
                    align: 'center',
                    style: {
                        fontSize: '18px',
                    }
                },
                theme: {
                    mode: this.$vuetify.theme.dark? 'dark' : 'light'
                },
                yaxis: {
                    min: 0,
                    max: 1000,
                    tickAmount: 4,
                    title: {
                        text: 'Est. Total Damage',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            fontSize: '16px',
                            cssClass: 'subtitle-1'
                        }
                    }
                },
                xaxis: {
                    type: 'numeric',
                    decimalsInFloat: 0,
                    tickAmount: 9,
                    min: 1,
                    max: 10,
                    title: {
                        text: 'Tiles Away from Target',
                        style: {
                            fontSize: '16px',
                            cssClass: 'font-weight-bold'
                        }
                    },
                    labels: {
                        style: {
                            cssClass: 'subtitle-1'
                        }
                    },
                    axisTicks: {
                        show: false
                    }
                }
            };
        },
        payloadHitProbabilities() {
            let wf1TargetingEfficiency = this.weaponFrame.TargetingEfficiency;
            let wf1OptimalRange = this.weaponFrame.OptimalRange;
            let wf1EffectiveRange = this.weaponFrame.EffectiveRange;
            let wf1ReliabilitiesAtDistances = [];
            for (var i = 1; i <= 10; i++) {
                let exponent = -1 * (Math.pow(i - wf1OptimalRange, 2) / Math.pow(wf1EffectiveRange, 2))
                let wf1ReliabilityAtDistance = wf1TargetingEfficiency * Math.exp(exponent);

                wf1ReliabilitiesAtDistances.push(wf1ReliabilityAtDistance);
            }

            let p1Velocity = this.payload.Velocity;
            let targetEvasionsAtDistances = [];
            for (i = 1; i <= 10; i++) {
                let targetEvasionAtDistance = (this.$store.state.configurationsTargetManeuverability * Math.pow(i, 1.5)) / (20 * p1Velocity);

                targetEvasionsAtDistances.push(targetEvasionAtDistance);
            }

            let hitProbabilities = [];
            for (i = 0; i <= 9; i++) {
                let result = Math.round(((1 -targetEvasionsAtDistances[i]) * wf1ReliabilitiesAtDistances[i]) * 10000) / 100;
                if (result < 0) {
                    hitProbabilities.push(0);
                } else {
                    hitProbabilities.push(result);
                }
            }

            // let hitPercentages = [];
            // for (i = 0; i <= 9; i++) {
            //     hitPercentages.push(hitProbabilities[i] * 100);
            // }

            return hitProbabilities;
        },
        weaponModelDamages() {
            var damageSeries = this.payloadHitProbabilities.map((probability) => {
                var optimalPayloadKineticDamage = this.payload.KineticDamageBias * this.payload.BaseDamage;
                var optimalPayloadEnergyDamage = this.payload.BaseDamage - optimalPayloadKineticDamage;
                
                var actualPayloadKineticDamage = optimalPayloadKineticDamage * (1 - this.$store.state.configurationsTargetArmorKineticResistance);
                var actualPayloadEnergyDamage = optimalPayloadEnergyDamage * (1 - this.$store.state.configurationsTargetArmorEnergyResistance);

                var totalKineticDamage = actualPayloadKineticDamage * this.weaponFrame.BaseMagSize;
                var totalEnergyDamage = actualPayloadEnergyDamage * this.weaponFrame.BaseMagSize;

                var totalDamage = totalKineticDamage + totalEnergyDamage;

                return Math.round((probability / 100) * totalDamage * 100) / 100
            });
            return damageSeries;
        },
        weaponDamageSeriesSet(){
            return  [
                {
                    name: 'Estimated Total Damage',
                    type: 'bar',
                    data: this.weaponModelDamages,
                }
            ]
        },
    },

    methods: {
        
    },

    created() {
        
    },

    mounted() {
        
    }
    
};
</script>

<style>
</style>
