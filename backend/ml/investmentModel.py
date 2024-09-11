import sys
import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
import random

# Example dataset with more options
X = np.array([
    [0, 0, 0, 0, 0, 0, 0, 0],  # Conservative
    [1, 1, 1, 1, 1, 1, 1, 1],  # Moderate
    [2, 2, 2, 2, 2, 2, 2, 2],  # Aggressive
    [1, 0, 2, 1, 0, 1, 2, 0],  # Balanced
    [2, 1, 0, 2, 1, 0, 1, 2],  # Growth
    [0, 2, 1, 0, 2, 1, 0, 1],  # Income
    [1, 2, 0, 1, 2, 0, 1, 2]   # Speculative
])
y = np.array(['Conservative', 'Moderate', 'Aggressive', 'Balanced', 'Growth', 'Income', 'Speculative'])

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

def predict_investment_strategy(quiz_data):
    if len(quiz_data) != 8:
        return 'Invalid input length'

    try:
        encoded_data = np.array([float(x) for x in quiz_data]).reshape(1, -1)
    except ValueError:
        min_value, max_value = 0, 2
        encoded_data = np.array([random.randint(min_value, max_value) for _ in range(8)]).reshape(1, -1)

    prediction = model.predict(encoded_data)[0]
    suggestions_dict = {
        'Conservative': (
            "- Bonds: Invest in short-term government bonds for stability and minimal risk.<br>"
            "- Mutual Funds: Choose conservative mutual funds or bond funds for lower returns but higher security.<br>"
            "- Savings Accounts: Include a high-yield savings account for liquidity and safety.<br>"
            "- Portfolio: Focus on short-term, low-risk investments to meet the goal of buying a house in less than a year with minimal risk and returns below 5%."
        ),
        'Moderate': (
            "- Bonds: Mix of government and corporate bonds for balanced risk.<br>"
            "- Stocks: Include blue-chip stocks for steady growth.<br>"
            "- Portfolio: Suitable for medium-term goals, typically 3-5 years."
        ),
        'Aggressive': (
            "- Stocks: Focus on high-growth technology and emerging market stocks.<br>"
            "- High-Yield Bonds: Consider high-yield corporate bonds.<br>"
            "- Portfolio: Best for long-term goals, such as retirement, spanning 5-10 years or more."
        ),
        'Balanced': (
            "- Stocks and Bonds: Maintain a balanced portfolio with a slight equity tilt.<br>"
            "- Diversification: Provides risk mitigation while capturing growth.<br>"
            "- Portfolio: Suitable for medium to long-term goals, around 5-7 years."
        ),
        'Growth': (
            "- Growth Stocks: Focus on technology and emerging markets for capital appreciation.<br>"
            "- Long-Term: Ideal for investments over 7-10 years.<br>"
            "- Portfolio: Best for investors with a high-risk tolerance aiming for substantial growth."
        ),
        'Income': (
            "- Dividend Stocks: Invest in dividend-paying stocks and bonds for steady income.<br>"
            "- Stability: Focuses on income generation rather than capital gains.<br>"
            "- Portfolio: Suitable for retirees or those seeking regular income over 3-5 years."
        ),
        'Speculative': (
            "- High-Risk Investments: Consider startups and cryptocurrencies.<br>"
            "- Long-Term: Suitable for a small portion of a diversified portfolio, with a long-term view of 10+ years.<br>"
            "- Portfolio: Aimed at investors with a very high-risk tolerance looking for potential exponential returns."
        )
    }
    return suggestions_dict.get(prediction, 'No suggestion available')

if __name__ == "__main__":
    quiz_data = json.loads(sys.argv[1])
    suggestion = predict_investment_strategy(quiz_data)
    print(suggestion)
