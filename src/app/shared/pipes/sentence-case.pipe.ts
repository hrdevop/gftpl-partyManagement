import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
})
export class SentenceCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Trim the input to avoid leading/trailing spaces issues
    value = value.trim();

    // Split the text into sentences
    const sentences = value
      .split(/([.!?]\s*)/)
      .filter(sentence => sentence.length > 0);

    // Process each sentence
    const formattedSentences = sentences.map((sentence, index) => {
      if (index % 2 === 0) {
        // Replace underscores with spaces and capitalize each word
        const processedSentence = sentence
          .replace(/_/g, ' ')
          .toLowerCase()
          .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
        // Capitalize the first letter of the sentence
        return (
          processedSentence.charAt(0).toUpperCase() + processedSentence.slice(1)
        );
      }
      return sentence;
    });

    // Join the sentences back together
    return formattedSentences.join('');
  }
}
