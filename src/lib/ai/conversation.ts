import { AI_DEFAULT_CONVERSATION_TITLE } from '@/constants/ai';

export function getDefaultConversationTitle() {
    return AI_DEFAULT_CONVERSATION_TITLE;
}

/**
 * Foydalanuvchining birinchi savolidan yoki kontekstdan ixcham va chiroyli mavzu (sarlavha) yaratish
 */
export function generateTopicTitle(message: string, fallbackLessonTitle?: string): string {
    if (fallbackLessonTitle && fallbackLessonTitle.trim()) {
        return fallbackLessonTitle.trim();
    }

    if (!message || !message.trim()) {
        return AI_DEFAULT_CONVERSATION_TITLE;
    }

    let text = message.trim();

    // 1. Markdown, kod bloklari va ortiqcha belgilarni tozalash
    text = text
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/[#*~_>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    // 2. Salomlashish va kirish so'zlarini tozalash (o'zbek va ingliz tillarida)
    const fillerPatterns = [
        /^(assalomu\s+alaykum(\s+va\s+rahmatulloh)?|assalom\s+alaykum|salomaleykum|salom|hayrli\s+(kun|tong|kech)|hello|hi|hey)[,!.\s]*/i,
        /^(iltimos|menga|qani|bizga|please|could you|can you)[,!.\s]*/i,
        /^(aytib\s+bering|aytib\s+ber|tushuntirib\s+bering|tushuntirib\s+ber|tushuntir|tushuntiring|yordam\s+bering|yordam\s+ber)[,!.\s]*/i,
        /^(explain|tell me about|help me with|solve|what is|how to)[,!.\s]*/i,
    ];

    for (const pattern of fillerPatterns) {
        text = text.replace(pattern, '').trim();
    }

    // 3. Birinchi gap yoki birinchi satrni olish
    const firstLine = text.split('\n')[0].trim();
    const firstSentence = firstLine.split(/[?!.]/)[0].trim() || firstLine;
    const candidate = firstSentence || text || AI_DEFAULT_CONVERSATION_TITLE;

    // 4. Uzunlik va so'z chegarasiga qarab qirqish
    if (candidate.length <= 36) {
        return candidate.charAt(0).toUpperCase() + candidate.slice(1);
    }

    const truncated = candidate.slice(0, 35);
    const lastSpace = truncated.lastIndexOf(' ');
    const result = lastSpace > 12 ? truncated.slice(0, lastSpace) : truncated;
    return result.charAt(0).toUpperCase() + result.slice(1) + '...';
}
