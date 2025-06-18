from sqlalchemy.orm import Session
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.models.property_model import Property
from app.models.search_history_model import SearchHistory
from app.models.favorite_model import Favorite

class RealEstateRecommender:
    def __init__(self, db: Session):
        self.db = db
        self.properties = self.db.query(Property).all()

    def recommend_by_text(self, user_query: str, top_n=5):
        docs = [prop.title + " " + prop.description for prop in self.properties]
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(docs)
        input_vec = vectorizer.transform([user_query])

        similarities = cosine_similarity(input_vec, tfidf_matrix).flatten()
        recommended_indices = similarities.argsort()[::-1][:top_n]

        return [self.properties[i] for i in recommended_indices]

    def recommend_by_favorites(self, user_id: int, top_n=5):
        favorite_properties = self.db.query(Favorite).filter(Favorite.user_id == user_id).all()
        favorite_ids = [fav.property_id for fav in favorite_properties]

        if not favorite_ids:
            return []

        # Gợi ý các tin đăng có mô tả tương tự tin yêu thích
        favorite_docs = [prop.title + " " + prop.description for prop in self.properties if prop.property_id in favorite_ids]
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(favorite_docs)

        all_docs = [prop.title + " " + prop.description for prop in self.properties]
        all_matrix = vectorizer.transform(all_docs)

        similarities = cosine_similarity(all_matrix, tfidf_matrix).mean(axis=1)
        recommended_indices = similarities.argsort()[::-1][:top_n]

        return [self.properties[i] for i in recommended_indices]

    def recommend_by_search_history(self, user_id: int, top_n=5):
        search_history = self.db.query(SearchHistory).filter(SearchHistory.user_id == user_id).all()
        if not search_history:
            return []

        search_texts = [search.query_text for search in search_history]
        vectorizer = TfidfVectorizer()
        history_matrix = vectorizer.fit_transform(search_texts)

        all_docs = [prop.title + " " + prop.description for prop in self.properties]
        all_matrix = vectorizer.transform(all_docs)

        similarities = cosine_similarity(all_matrix, history_matrix).mean(axis=1)
        recommended_indices = similarities.argsort()[::-1][:top_n]

        return [self.properties[i] for i in recommended_indices]
