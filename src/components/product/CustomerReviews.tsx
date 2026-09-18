"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: number;
  rating: number;
  review: string; // HTML content
  reviewer: string;
  reviewer_email: string;
  date_created: string;
}

interface CustomerReviewsProps {
  productId: number;
  initialReviews: Review[];
}

export default function CustomerReviews({ productId, initialReviews }: CustomerReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isWriting, setIsWriting] = useState(false);
  
  // Form State
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerEmail, setReviewerEmail] = useState("");
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Summary stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(2)
    : "0.00";

  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length
  }));

  // Extract photos from reviews HTML (assuming we append them as <img data-review-photo src="...">)
  const allPhotos: string[] = [];
  reviews.forEach(r => {
    const match = r.review.match(/<img data-review-photo src="(.*?)"/);
    if (match && match[1]) {
      allPhotos.push(match[1]);
    }
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Append photo to review content if it exists
    let finalReviewContent = reviewText;
    if (photoBase64) {
      finalReviewContent += `<br/><br/><img data-review-photo src="${photoBase64}" alt="Customer photo" style="max-width: 200px; border-radius: 8px;"/>`;
    }

    try {
      const res = await fetch("/api/woocommerce/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          rating: rating,
          review: finalReviewContent,
          reviewer: reviewerName,
          reviewer_email: reviewerEmail
        })
      });

      if (res.ok) {
        const result = await res.json();
        // Add optimistic review to UI
        setReviews([result.data, ...reviews]);
        setIsWriting(false);
        setReviewText("");
        setRating(5);
        setPhotoBase64(null);
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg className={`w-5 h-5 ${filled ? "text-[#C19B6C]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="py-12 border-t border-brand-charcoal/10 max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl font-serif font-bold text-brand-charcoal mb-6">Customer Reviews</h2>
      
      {/* Summary */}
      <div className="flex items-center gap-4 mb-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} filled={star <= Math.round(Number(averageRating))} />
          ))}
        </div>
        <span className="text-lg font-medium text-brand-charcoal">{averageRating} out of 5</span>
      </div>
      
      <div className="flex items-center gap-2 mb-8">
        <span className="text-brand-charcoal/70">Based on {totalReviews} reviews</span>
        <svg className="w-5 h-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Progress Bars */}
      <div className="w-full max-w-sm mb-8 space-y-2">
        {ratingCounts.map(({ stars, count }) => (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} className={`w-4 h-4 ${s <= stars ? "text-[#C19B6C]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-800" 
                style={{ width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%` }}
              />
            </div>
            <span className="w-6 text-right text-brand-charcoal text-sm">{count}</span>
          </div>
        ))}
      </div>

      {/* Write a Review Button */}
      {!isWriting ? (
        <button 
          onClick={() => setIsWriting(true)}
          className="w-full max-w-sm py-3 px-6 border-2 border-brand-charcoal rounded-full font-bold text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-colors mb-12"
        >
          Write A Review
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm mb-12 p-6 border border-brand-charcoal/10 rounded-xl bg-white shadow-sm">
          <h3 className="font-bold mb-4 text-brand-charcoal text-lg">Write your review</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button" 
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <StarIcon filled={star <= rating} />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input required type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="w-full border border-brand-charcoal/20 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input required type="email" value={reviewerEmail} onChange={(e) => setReviewerEmail(e.target.value)} className="w-full border border-brand-charcoal/20 rounded-md p-2 text-sm focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Review</label>
            <textarea required value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="w-full border border-brand-charcoal/20 rounded-md p-2 text-sm h-24 focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none"></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Add a Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-sm" />
            {photoBase64 && (
              <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden">
                <Image src={photoBase64} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={isSubmitting} className="flex-1 bg-brand-charcoal text-white py-2 rounded-full font-bold hover:bg-brand-charcoal/90 transition-colors disabled:opacity-50">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            <button type="button" onClick={() => setIsWriting(false)} className="px-4 py-2 border border-brand-charcoal/20 rounded-full font-medium hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Customer Photos */}
      {allPhotos.length > 0 && (
        <div className="w-full mb-12">
          <h3 className="text-center text-lg text-brand-charcoal mb-6">Customer photos & videos</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {allPhotos.map((photo, i) => (
              <div key={i} className="relative w-32 h-32 rounded-xl overflow-hidden shadow-sm">
                <Image src={photo} alt="Customer photo" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Individual Reviews List */}
      <div className="w-full space-y-6">
        {reviews.map((r) => (
          <div key={r.id} className="border-b border-brand-charcoal/10 pb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= r.rating} />
                ))}
              </div>
              <span className="font-bold text-sm text-brand-charcoal ml-2">{r.reviewer}</span>
              <span className="text-xs text-brand-charcoal/50 ml-auto">{new Date(r.date_created).toLocaleDateString()}</span>
            </div>
            <div className="text-sm text-brand-charcoal/80 prose prose-sm" dangerouslySetInnerHTML={{ __html: r.review }} />
          </div>
        ))}
      </div>
    </div>
  );
}
