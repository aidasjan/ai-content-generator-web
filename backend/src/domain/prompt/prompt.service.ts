export const generatePrompt = async (
  category: string,
  properties: string[],
  keywords: string[]
) => {
  if (!category || !properties) {
    return null
  }

  const prompt = `Create ${category} that has the following properties: ${properties.join(
    ', '
  )}. The ${category} should include the following keywords: ${keywords.join(
    ', '
  )}.`

  return prompt
}
