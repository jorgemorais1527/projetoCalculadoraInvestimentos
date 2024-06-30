function convertToMontlyReturn(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnsArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!startingAmount || !timeHorizon) {
    throw new Error(
      "Investimento inicial e prazo devem ser preenchidos com valores positivos."
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? 1 + returnRate / 100
      : convertToMontlyReturn(1 + returnRate / 100);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestimentObject = {
    investedAmount: startingAmount,
    interesReturns: 0,
    totalInteresReturns: 0,
    month: 0,
    totalAmount: startingAmount,
  };

  const returnArray = [referenceInvestimentObject];

  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;

    const interesReturns =
      returnArray[timeReference - 1].totalAmount * finalReturnRate;

    const investedAmount = startingAmount + monthlyContribution * timeReference;

    const totalInteresReturns = totalAmount - investedAmount;

    returnArray.push({
      investedAmount,
      interesReturns,
      totalInteresReturns,
      month: timeReference,
      totalAmount,
    });
  }
  return returnArray;
}
